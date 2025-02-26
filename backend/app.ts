import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import router from './routes/user.routes.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());
app.use(cookieParser());
app.use('/users',router)
export default app;
