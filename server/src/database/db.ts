import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const db =()=>{
   mongoose.connect(process.env.MONGO_URI as string)
   .then(()=>{
    console.log("mongo db connected")
   })
   .catch((error)=>{
    console.log("Error:",error);
    
   })
}