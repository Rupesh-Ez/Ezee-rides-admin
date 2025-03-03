import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import adminRoute from './routes/admin.route.js'
import regionRoute from './routes/region.route.js'
import serviceRoute from './routes/service.route.js'
import couponRoute from './routes/coupon.route.js'
import termsRoute from './routes/terms.route.js'
import policyRoute from './routes/policy.route.js'
import NotificationRoute from './routes/pushnotification.route.js'
import DriverRoute from './routes/driver.route.js'
import CustomerRoute from './routes/customer.route.js'
import RidesRoute from './routes/ride.route.js'
import ComplaintsRoute from './routes/complaint.route.js'
import WithdrawRoute from './routes/withdraw.route.js'
import DealRoute from './routes/deals.route.js'
import fileUpload from 'express-fileupload';
import path from 'path'
import { Server } from 'socket.io';
import http from 'http';
import fs from 'fs';

dotenv.config({})

const app = express();

const _dirname = path.resolve();

app.use(fileUpload());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const allowedOrigins = [
    'https://apps.ezeeriders.in',
    'http://apps.ezeeriders.in',
    'http://145.223.23.193',
    'http://localhost:5173'
];

const coreOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(coreOptions))

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://apps.ezeeriders.in"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    },
    transports: ["websocket", "polling"],
    allowEIO3: true
});


io.on('connection', (socket) => {
    console.log('Admin Panel Connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Admin Panel Disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 8000;

app.use("/api/admin", adminRoute);
app.use("/api/region", regionRoute);
app.use("/api/service", serviceRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/terms", termsRoute);
app.use("/api/privacypolicy", policyRoute);
app.use("/api/pushnotification", NotificationRoute);
app.use("/api/driver", DriverRoute);
app.use("/api/customer", CustomerRoute);
app.use("/api/rides", RidesRoute);
app.use("/api/complaint", ComplaintsRoute);
app.use("/api/withdraw", WithdrawRoute);
app.use("/api/deals", DealRoute);

//app.use(express.static(path.join(_dirname,"/cab-booking-admin-frontend/dist")))
//app.get('*',(_,res)=>{
//    res.sendFile(path.resolve(_dirname,"cab-booking-admin-frontend","dist","index.html"));
//})

server.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});

export { io, server };
