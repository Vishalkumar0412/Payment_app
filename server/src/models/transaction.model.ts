import mongoose from "mongoose";
interface ITransaction extends mongoose.Document {
    from: mongoose.Types.ObjectId;
    to: mongoose.Types.ObjectId;
    amount: number;
    type: 'credit' | 'debit';
    description?: string;
    status: 'pending' | 'completed' | 'failed';
    createdAt?: Date;
    
}
const TransactionSchema = new mongoose.Schema<ITransaction>({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    
    description: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    }
},{timestamps:true});
const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);
export default Transaction;
