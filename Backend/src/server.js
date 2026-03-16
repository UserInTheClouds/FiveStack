import express from 'express'
import authRoute from './routes/auth.route.js'
import dotenv from 'dotenv'
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("We are in the backend now");
})

app.use('/api/auth',authRoute);

app.listen(process.env.port,()=>{
    try {
        console.log("Server is working at port",process.env.PORT);
    } catch (error) {
        
    }
})