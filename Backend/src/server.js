import express from 'express'
import authRoute from './routes/auth.route.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import messageRoute from './routes/message.route.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import { doubleCsrf } from "csrf-csrf";

dotenv.config();

const {
    generateCsrfToken,
    doubleCsrfProtection,
} = doubleCsrf({
    getSecret: () => process.env.ACCESS_TOKEN_SECRET,
    cookieName: "x-csrf-token",
    cookieOptions: {
        sameSite: (process.env.NODE_ENV === "production" || process.env.DEVSTATUS !== "DEVELOPMENT") ? 'none' : 'lax',
        secure: (process.env.NODE_ENV === "production" || process.env.DEVSTATUS !== "DEVELOPMENT")
    },
    size: 64,
    ignoredMethods: ["GET", "HEAD", "OPTIONS"],
    getSessionIdentifier: () => "stateless",
});

const app = express();

app.set('trust proxy', 1);

app.use(cors({
    origin: ["https://five-stack-five.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"]
}))

const httpServer = createServer(app);

const sio = new Server(httpServer, {
    cors: {
        origin: ["https://five-stack-five.vercel.app", "http://localhost:5173"],
        methods: ['GET', 'POST', "PUT"],
        credentials: true
    }
})

app.set("io", sio);
const userSocketMap = {};
app.set("userSocketMap", userSocketMap);

sio.use((socket, next) => {
    try {
        const cookieHeader = socket.handshake.headers.cookie;
        if (!cookieHeader) {
            return next(new Error("Authentication error: No cookies found"));
        }
        const token = cookieHeader
            .split(';')
            .find(c => c.trim().startsWith('accessToken='))
            ?.split('=')[1];

        if (!token) {
            return next(new Error("Authentication error: Token missing"));
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        socket.userID = decoded.userID;
        next();
    } catch (error) {
        next(new Error("Authentication error: Invalid token"));
    }
});


sio.on('connection', (socket) => {
    const userId = socket.userID;
    if (userId) {
        userSocketMap[userId] = socket.id;
        sio.emit("receiveOnlineUserList", Object.keys(userSocketMap));
    }
    console.log(`User ${userId} is connected with socket id : ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`User ${userId} disconnected`);
        delete userSocketMap[userId];
        sio.emit('receiveOnlineUserList', Object.keys(userSocketMap));
    })
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("We are in the backend now");
})
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: "Too many requests from this IP, please try again after 15 minutes" },
    standardHeaders: true,
    legacyHeaders: false,
});

app.get("/api/csrf-token", (req, res) => {
    const csrfToken = generateCsrfToken(req, res);
    res.json({ csrfToken });
});

app.use('/api/auth', authLimiter, authRoute);

app.use('/api/messages', doubleCsrfProtection, messageRoute);

httpServer.listen(process.env.PORT, "0.0.0.0", () => {
    try {
        console.log("Server is working at port", process.env.PORT);
    } catch (error) {

    }
})