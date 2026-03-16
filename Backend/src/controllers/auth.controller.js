import prisma from '../utilities/dbConnect.js'
import bcrypt from 'bcrypt'

export const signupRoute = async (req,res)=>{
    const {username,email,password} = req.body;
    try {
        if(!password || !email || !username){
            return res.status(500).json({message:"All fields are mandatory!"});
        }
        if(password.length<8){
            return res.status(500).json({message:"Password must be atleast 8 characters long"});
        }

        //Checks if email already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email:email
            }
        }) 

        if(existingUser){
            return res.status(500).json({message:"This email already exists"});
        }

        //Checks if username already exists
        const existingUsern = await prisma.user.findUnique({
            where:{
                username:username
            }
        })
        
        if(existingUsern){
            return res.status(500).json({message:"This username already exists"})
        }

        //Saving to database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = await prisma.user.create({
            data:{
                email:email,
                password:hashedPassword,
                username:username
            }
        });
        if(newUser){
            return res.status(201).json({user:newUser})
        }
        else{
            return res.status(500).json({message:"Something went wrong in signup controller"});
        }
    } catch (error) {
        console.log("error in signup controller",error);
        return res.status(400).json({message:error.message});
    }
}

export const loginRoute = async (req,res) => {

}

export const logoutRoute = async (req,res) =>{

}

export const checkRoute = async(req,res) => {

}