import crypto from 'crypto'
import prisma from './dbConnect.js'

const verifyOTP = async (email, enteredOTP)=>{
    const userRecord = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(!userRecord){
        return { success: false, message: 'User not found' };
    }
    if(new Date() > userRecord.OTPExpiryTime){
        return { success: false, message: "Invalid or expired OTP" }; 
    }
    if(userRecord.OTP_failedattempts>=5){
        return { success: false, message: "Too many failed attempts" };
    }
    const enteredOTPhashed = crypto.createHash('sha256').update(enteredOTP).digest('hex');
    if(userRecord.hashedOTP !== enteredOTPhashed){
        await prisma.user.update({
            where:{email:email},
            data:{OTP_failedattempts:{increment:1}}
        })
        return {success:false,message:"Invalid or expired OTP"}
    }
    await prisma.user.update({
        where:{
            email:email
        },
        data:{
            isVerified:true,
            hashedOTP:null,
            OTPExpiryTime:null,
            OTP_failedattempts:0
        }
    })
    return {success:true,user:userRecord};
}

export default verifyOTP