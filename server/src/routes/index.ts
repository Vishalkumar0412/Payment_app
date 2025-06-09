import express from 'express';
import userRouter from './userRoutes';
import accountRouter from './accountRoutes';
import transactionRouter from './transactionRoutes';

const router = express.Router();

router.use('/users', userRouter);
router.use('/account', accountRouter);
router.use('/transactions', transactionRouter); 


export default router;
