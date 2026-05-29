import express from 'express'
import authRoute from './routes/auth.route.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import messageRoute from './routes/message.route.js'
import {createServer} from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
dotenv.config();

const app = express();
app.use(cors({
    origin:"https://five-stack-five.vercel.app"||"http://localhost:5173",
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
const httpServer = createServer(app);

const sio = new Server(httpServer,{
    cors:{
        origin:"https://five-stack-five.vercel.app"||"http://localhost:5173",
        methods:['GET','POST',"PUT"]
    }
})

app.set("io",sio);
const userSocketMap = {};
app.set("userSocketMap",userSocketMap);

sio.on('connection',(socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId] = socket.id;
        sio.emit("receiveOnlineUserList",Object.keys(userSocketMap));
    }
    console.log(`User ${userId} is connected with socket id : ${socket.id}`);
    socket.on("sendMessage",(msgData)=>{
        socket.broadcast.emit('receiveMessage',msgData);
    })
    socket.on('disconnect',()=>{
        console.log(`User ${userId} disconnected`);
        delete userSocketMap[userId];
        sio.emit('receiveOnlineUserList',Object.keys(userSocketMap));
    })
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("We are in the backend now");
})

app.use('/api/auth',authRoute);
app.use('/api/messages',messageRoute);

httpServer.listen(process.env.PORT,"0.0.0.0",()=>{
    try {
        console.log("Server is working at port",process.env.PORT);
    } catch (error) {
        
    }
})