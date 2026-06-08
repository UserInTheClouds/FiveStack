import jwt from 'jsonwebtoken'
import prisma from './dbConnect.js'
import crypto from 'crypto'

const genToken = async (userID, res) => {
    const accessToken = jwt.sign({ userID }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
    const refreshToken = jwt.sign({ userID }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })

    const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
    await prisma.user.update({
        where: {
            id: userID
        },
        data: {
            hashedRefreshToken: hashedRefreshToken
        }
    })

    res.cookie('accessToken', accessToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.DEVSTATUS !== "DEVELOPMENT" ? 'none' : 'lax',
        secure: process.env.DEVSTATUS !== "DEVELOPMENT"
    });

    res.cookie('refreshToken', refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.DEVSTATUS !== "DEVELOPMENT" ? 'none' : 'lax',
        secure: process.env.DEVSTATUS !== "DEVELOPMENT"
    });
}

export default genToken
