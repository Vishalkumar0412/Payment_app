import express from 'express';
import userRouter from './userRoutes';
import accountRouter from './accountRoutes';

const router = express.Router();

router.use('/users', userRouter);
router.use('/account', accountRouter);

export default router;
// This file serves as the main entry point for the API routes.