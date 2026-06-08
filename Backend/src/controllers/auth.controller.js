import prisma from '../utilities/dbConnect.js'
import bcrypt from 'bcrypt'
import genToken from '../utilities/jwtGen.js'
import generate_send_otp from '../utilities/otpgen.js'
import verifyOTP from '../utilities/otpverify.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export const signupRoute = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!password || !email || !username) {
            return res.status(400).json({ message: "All fields are mandatory!" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be atleast 8 characters long" });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (existingUser) {
            return res.status(400).json({ message: "This email already exists" });
        }

        const existingUsern = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (existingUsern) {
            return res.status(400).json({ message: "This username already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                username: username,
                isVerified: false
            }
        });
        if (newUser) {
            await generate_send_otp(email);
            return res.status(201).json({ message: "OTP sent to email" });
        }
        else {
            return res.status(500).json({ message: "Something went wrong in signup controller" });
        }
    } catch (error) {
        console.log("error in signup controller", error);
        return res.status(500).json({ message: error.message });
    }
}

export const loginRoute = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        await generate_send_otp(existingUser.email);

        return res.status(200).json({
            message: "OTP sent to email",
            email: existingUser.email,
        });

    } catch (error) {
        console.log('Error in Login controller', error);
        return res.status(500).json({ message: error.message });
    }
}

export const logoutRoute = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            try {
                const decoded = jwt.decode(refreshToken);
                if (decoded && decoded.userID) {
                    await prisma.user.update({
                        where: { id: decoded.userID },
                        data: { hashedRefreshToken: null }
                    })
                }

            } catch (error) {
                console.log("Error in removing token during logout")
            }
        }
        res.cookie('accessToken', '', {
            maxAge: 0,
            httpOnly: true,
            sameSite: process.env.DEVSTATUS !== "DEVELOPMENT" ? 'none' : 'lax',
            secure: process.env.DEVSTATUS !== "DEVELOPMENT"
        });
        res.cookie('refreshToken', '', {
            maxAge: 0,
            httpOnly: true,
            sameSite: process.env.DEVSTATUS !== "DEVELOPMENT" ? 'none' : 'lax',
            secure: process.env.DEVSTATUS !== "DEVELOPMENT"
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error);
        return res.status(500).json({ message: error.message });
    }
}

export const checkRoute = async (req, res) => {
    try {
        return res.status(200).json(req.user);

    } catch (error) {
        console.log('Error in checkRoute', error);
        return res.status(500).json({ message: error.message });
    }
}

export const verifyRoute = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }
        const result = await verifyOTP(email, otp);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }
        await genToken(result.user.id, res);
        return res.status(200).json({
            id: result.user.id,
            username: result.user.username,
            email: result.user.email
        })

    } catch (error) {
        console.log('Error in verify otp controller', error);
        return res.status(500).json({ message: "Error in verification" });
    }
}

export const forgotPasswordRoute = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (!existingUser) {
            return res.status(404).json({ message: "User with this email not found" });
        }

        await generate_send_otp(email);
        return res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        console.log("Error in forgotPasswordRoute", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const resetPasswordRoute = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "Email, OTP, and New Password are required" });
        }
        if (newPassword.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const result = await verifyOTP(email, otp);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword }
        });

        await genToken(result.user.id, res);
        return res.status(200).json({
            id: result.user.id,
            username: result.user.username,
            email: result.user.email
        });

    } catch (error) {
        console.log("Error in resetPasswordRoute", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const refreshTokenRoute = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized Access: No refresh token" })
        }
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        } catch (error_token) {
            return res.status(401).json({ message: "Unauthorized Access: Invalid refresh token" })
        }
        const user = await prisma.user.findUnique({
            where: { id: decoded.userID }
        })
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const userTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')
        if (!user.hashedRefreshToken || user.hashedRefreshToken !== userTokenHash) {
            await prisma.user.update({
                where: { id: user.id },
                data: { hashedRefreshToken: null }
            })
            res.cookie('accessToken', '', {
                maxAge: 0
            })
            res.cookie('refreshToken', '', {
                maxAge: 0
            })
            return res.status(401).json({
                message: "Session might be compromised. Please log in again."
            })

        }
        await genToken(user.id, res);

        return res.status(200).json({
            message: "Token refreshed successfully"
        })

    } catch (error) {
        console.log("Error in refreshTokenRoute", error);
        return res.status(500).json({ message: "Server error" });
    }
}