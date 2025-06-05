import mongoose, { Document } from "mongoose";
interface IAccount extends Document {
    userId: mongoose.Types.ObjectId;
    balance: number;
    accountType: 'savings' | 'current';
    createdAt?: Date;
    updatedAt?: Date;
}
const AccountSchema = new mongoose.Schema<IAccount>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    accountType: {
        type: String,
        enum: ['savings', 'current'],
        required: true,
        default: 'savings',
    }
}, { timestamps: true });
const Account = mongoose.model<IAccount>('Account', AccountSchema);
export default Account;