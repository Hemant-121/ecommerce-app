import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import dotenv from "dotenv"


dotenv.config({
    path: './.env'
})


const app = express();

app.use(cors({
    origin: `${process.env.URL}`, // Update with your frontend URL
    credentials: true, // Allow credentials
  }));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import 
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import reviewRouter from './routes/review.routes.js';

// routes declarations
app.use('/api/v1/users', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/review', reviewRouter);


export { app };
