// File: server/src/models/user.model.ts

import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'admin';
    transactions?: mongoose.Types.ObjectId[];
    account?:mongoose.Types.ObjectId;
    mobile: string;
    profileUrl?:string
 
}
const UserSchema  = new mongoose.Schema <IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        
    }],
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        
    },
    mobile:{
        type:String,
        unique:true,
        required:true
    },
    profileUrl:{
        typr:String,
    }
   
    
},{timestamps: true});
const User = mongoose.model<IUser>('User', UserSchema);
export default User;