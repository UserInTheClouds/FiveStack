import jwt from 'jsonwebtoken'
import prisma from '../utilities/dbConnect.js'

const protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorized Access: No token provided"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized Access: Invalid token"});
        }
        const user = await prisma.user.findUnique({
            where:{id:decoded.userID},
            select:{
                id:true,
                email:true,
                username:true
            }
        })
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware", error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export default protectRoute