import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { Model, Schema, HydratedDocument, model } from 'mongoose';
import { IUser,IUserMethods,IUserModel} from "../types/IUser.type.js"
const userSchema=new Schema<IUser,IUserModel,IUserMethods>({

    firstName:{
        type:String,
        required:true,
        minlength:[3,'First name must me more than 3 character long or more']
    },
    lastName:{
        type:String,
        minlength:[3,'Last name must  be 3 or more than 3 character long']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must have 5 or more characters in it']
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    // socketId:{
    //     type:String,
    //     required:true
    // }


})
userSchema.methods.generateAuthTokeen=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET as string);
    return token;
}
userSchema.methods.comparePassword=async  function(password:string){
return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword=async function(password:string){
return await bcrypt.hash(password,10);
}
const userModel=model<IUser,IUserModel>('user',userSchema);
export default userModel;