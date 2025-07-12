import jwt from 'jsonwebtoken'
import { Response } from 'express';

 


export const generateToken = (
    res: Response,
    user: object,
    message: string
): Response => {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: '7d',
    });
    return res.status(200)
        .cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        })
        .json({
            success: true,
            message,
            token,
            user
        });
};