import { Request,Response } from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticationRequest } from "../types/authecationRequest.type.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
export const authUser=async(req:AuthenticationRequest,res:Response,next:NextFunction):Promise<void>=>{

    const token = req.cookies.token || ((typeof req.headers.authorization==='string') && req.headers.authorization?.split(' ')[1]);
    if(!token)
    {
        res.status(401).json({
            message:'Unautherized'
        });
        return;
    }
    const isBlackListed=await blacklistTokenModel.findOne({token});
    
    if(isBlackListed)
    {    
        res.status(401).json({
            message:'unauthrized'
        });
        return ;
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET as string) as {_id :string};
        const user=await userModel.findById(decoded._id);
        if(!user)
        {
             throw Error('Invalid Request');
        }
        req.user=user;
        next();
        return ;
    }
    catch(error){
      res.status(401).json({message:'Unauthroized access'})
    }
}