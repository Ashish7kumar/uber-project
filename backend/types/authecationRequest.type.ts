import { Request } from "express";
import { IUser } from "./IUser.type.js";
export interface AuthenticationRequest extends Request{
    user?:IUser 
}