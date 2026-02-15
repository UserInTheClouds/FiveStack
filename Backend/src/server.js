import express from 'express'
import authRoute from './routes/auth.route.js'
import dotenv from 'dotenv'
import dbConnect from './utils/dbConnect.js'

dotenv.config()

const app = express();

app.use('/api/auth',authRoute);

app.listen(process.env.PORT,()=>{
    try{
    console.log("server is working at port ",process.env.PORT);
    dbConnect();
    }
    catch(error){
    console.log("Error in starting the server\n\n",error);
    }
})

