import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
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

dotenv.config({})

const app = express();

const _dirname = path.resolve();


app.use(fileUpload());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const coreOptions = {
    // origin:'https://ezee-rides-admin.onrender.com',
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(coreOptions))

const PORT = process.env.PORT ||8000;

app.use("/api/admin",adminRoute);
app.use("/api/region",regionRoute);
app.use("/api/service",serviceRoute);
app.use("/api/coupon",couponRoute);
app.use("/api/terms",termsRoute);
app.use("/api/privacypolicy",policyRoute);
app.use("/api/pushnotification",NotificationRoute);
app.use("/api/driver",DriverRoute);
app.use("/api/customer",CustomerRoute);
app.use("/api/rides",RidesRoute);
app.use("/api/complaint",ComplaintsRoute);
app.use("/api/withdraw",WithdrawRoute);
app.use("/api/deals",DealRoute);

// app.use(express.static(path.join(_dirname,"/cab-booking-admin-frontend/dist")))
// app.get('*',(_,res)=>{
//     res.sendFile(path.resolve(_dirname,"cab-booking-admin-frontend","dist","index.html"));
// })

app.listen(PORT,()=>{
    connectDB()
    console.log(`server is running on ${PORT}`)
})