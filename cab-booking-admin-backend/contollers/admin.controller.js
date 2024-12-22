import { Admin } from "../models/admin.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"something is missing",
                success:false
            })
        }
        const user = await Admin.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect email",
                success:false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect password",
                success:false
            })
        }
        const tokenData = {
            userId : user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Respond with the token and user info
        return res.status(200).json({
            message: `Welcome Back ${user.email}`,
            token, // Send token in the response
            user: {
                _id: user._id,
                email: user.email,
            },
            success: true
        });
    } catch (error) {
        console.log(error);
        
    }
}
export const register = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"something is missing",
                success:false
            })
        }
        let user = await Admin.findOne({email});
        if(user){
            return res.status(400).json({
                message:"Incorrect email",
                success:false
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await Admin.create({
            email,
            password: hashedPassword,
        })
        return res.status(201).json({
            message:"created admin successfully",
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
        
    }
}
export const logout = async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
