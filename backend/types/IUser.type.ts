import {Model} from 'mongoose'
export interface IUser{
    firstName:string,
    lastName?:string,
    email:string,
    password:string,
    // socketId:string
}
export interface IUserMethods{
    generateAuthTokeen():string,
    comparePassword(password:string):Promise<boolean>

}
export interface IUserModel extends Model<IUser,{},IUserMethods>{
   hashPassword(password:string):Promise<string>
}