import express from 'express';
import dotenv from 'dotenv'
import { db } from './database/db';
import rootRouter from './routes/index';
import './models'
import cors from 'cors'
dotenv.config();
import cookieParser from 'cookie-parser';

const PORT=process.env.PORT || 3001;
const app = express();
app.use(express.json());
db();// database connection
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // 🔴 this was misspelled as "credentias"
}));



app.use('/api/v1',rootRouter);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});