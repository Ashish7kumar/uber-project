import mongoose from "mongoose";

const blackListSchema=new mongoose.Schema({
    token:{type:String,required:true,unique:true},
    createdAt:{type:Date,default:Date.now,expires:"24h"}
});
export default mongoose.model('BlacklistToken',blackListSchema);
