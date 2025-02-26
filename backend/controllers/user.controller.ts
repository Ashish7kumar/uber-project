import userModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import { NextFunction, Request,response,Response } from "express";
import { AuthenticationRequest } from "../types/authecationRequest.type.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
export const  registerUser=async(req:Request,res:Response,next:NextFunction):Promise<void> =>{

const errors=validationResult(req);
if(!errors.isEmpty()){
    res.status(400).json({
        errors:errors.array()
    });
    return 
}
try{
const hashedPassword = await userModel.hashPassword(req.body.password);
const user=await createUser({
    firstName: req.body.fullName.firstName,
    lastName: req.body.fullName.lastName,
    email: req.body.email,
    password: hashedPassword
});
const token=user.generateAuthTokeen();
res.status(201).json({
    token,user
});
}
catch(err){
    res.status(400).json({message:"Invalid request"});
}
}
export const loginUser=async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            errors:errors.array()
        });
        return 
    }
    const user=await userModel.findOne({email:req.body.email}).select("+password");
    if(!user){
        res.status(401).json({
            message:'Invalid email or Password'
        });
        return;

    }
    const isMatch=await  user.comparePassword(req.body.password);
    if(!isMatch)
    {
        res.status(401).json({
            message:'Invalid email or password'
        });
        return ;
    }
    const token=user.generateAuthTokeen();
    res.status(200).json({
        token:token,
        user:user
    });   
}
export const getUserProfile=async(req:AuthenticationRequest,res:Response,next:NextFunction):Promise<void>=>{
res.status(200).json(req.user);
}
export const logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(400).json({ message: "No token provided" });
            return;
        }
        const existingToken = await blacklistTokenModel.findOne({ token });
        if(!existingToken){
        await blacklistTokenModel.create({ token });}
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error:any) {
        res.status(500).json({ message: "Failed to logout", error: error.message });
    }
};