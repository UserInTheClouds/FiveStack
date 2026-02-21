import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    pfp:{
       type: String,
       default:"" 
    }
    
}, {timestamps: true})

const user = mongoose.model("User",userSchema);

export default user