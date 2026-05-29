import nodemailer from 'nodemailer'
import crypto from 'crypto'
import prisma from './dbConnect.js'
import dotenv from 'dotenv'

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS
    }
})

const generate_send_otp = async (email)=>{
        const otp = crypto.randomInt(100000,999999).toString();
        const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

        const expiryTime = new Date(Date.now() + 10*60*1000);

        await prisma.user.update({
            where:{ email: email},
            data:{
                hashedOTP:hashedOTP,
                OTP_failedattempts:0,
                OTPExpiryTime: expiryTime
            }
        })

        const mailOptions = {
            from:process.env.EMAIL,
            to:email,
            subject:"Verification Code - FIvestack",
            html:`<p>Your OTP is <strong>${otp}</strong><p/>`
        }
        await transporter.sendMail(mailOptions);
}

export default generate_send_otp