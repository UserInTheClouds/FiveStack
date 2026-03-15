import express from 'express'

const app = express();

app.use('/',(req,res)=>{
    res.send("We are in the backend now");
})

app.listen(3000,()=>{
    try {
        console.log("Server is working at port 3000");
    } catch (error) {
        
    }
})