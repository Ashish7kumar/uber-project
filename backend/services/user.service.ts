import userModel from "../models/user.model.js";
interface UserInput {
    firstName: string;
    lastName?: string;  
    email: string;
    password: string;
}

export const createUser=async ({
    firstName,lastName,email,password
}:UserInput)=>{
  if(!firstName || !email || !password)
  {
    throw new Error('All fields are required');
  }

  const user=userModel.create({
    
        firstName,
        lastName,
    email,
    password
  })
  return user;
}