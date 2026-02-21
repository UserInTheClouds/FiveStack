import User from '../models/users.model.js'
import bcrypt from 'bcryptjs'
import tokenGen from '../utils/jwtTokenGen.js'

export const loginRoute = (req,res)=>{
    res.send('Login Page');
}

export const signupRoute = async (req,res)=>{
    const {username,email,password} = req.body;
    try {
        if(!password||!email||!username){
            res.status(400).json({message:"All fields are required"});
        }
        if(password.length<8){
           return res.status(400).json({message: "Password must be atleast 8 characters"});
        }
        const newuser = await User.findOne({email});
        if(newuser){
            return res.status(400).json({message: "This email already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            username:username,
            password:hashedPassword,
            email:email
        })
        if(newUser){
            //jwt token gen
            tokenGen(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                password:newUser.password,
                email:newUser.email,
                username:newUser.username,
            });
        }
        else{
            return res.send(400).json({message:"Invalid user data"});
        }
    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}  

export const logoutRoute = (req,res)=>{
    res.send('Logged out');
}