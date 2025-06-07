import mongoose, { Document } from "mongoose";
interface IAccount extends Document {
    userId: mongoose.Types.ObjectId;
    balance?: number;
    transactions?: mongoose.Types.ObjectId[];
    accountType: 'savings' | 'current';
    
}
const AccountSchema = new mongoose.Schema<IAccount>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        default: 1000,
    },
    accountType: {
        type: String,
        enum: ['savings', 'current'],
        required: true,
        default: 'savings',
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
    }],

}, { timestamps: true });
const Account = mongoose.model<IAccount>('Account', AccountSchema);
export default Account;