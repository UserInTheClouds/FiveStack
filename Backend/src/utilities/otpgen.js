import crypto from 'crypto'
import prisma from './dbConnect.js'
import dotenv from 'dotenv'
dotenv.config();

const generate_send_otp = async (email) => {
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

    const expiryTime = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
        where: { email: email },
        data: {
            hashedOTP: hashedOTP,
            OTP_failedattempts: 0,
            OTPExpiryTime: expiryTime
        }
    })

    const mailOptions = {
        to: email,
        subject: "Verification Code - FiveStack",
        html: `<p>Your OTP is <strong>${otp}</strong></p>`
    }

    // Use the Google Apps Script Web App URL from your .env file
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!scriptUrl) {
        console.error("Missing GOOGLE_APPS_SCRIPT_URL in environment variables.");
        return;
    }

    try {
        const response = await fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify(mailOptions),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            console.error("Failed to send OTP via Google Apps Script");
        } else {
            console.log("OTP email sent successfully via Google Apps Script!");
        }
    } catch (error) {
        console.error("Error connecting to Google Apps Script:", error);
    }
}

export default generate_send_otp