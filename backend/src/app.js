import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
// import path from "path";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend URL
    credentials: true, // Allow credentials
  }));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// const _dirname = path.resolve();
// app.use(express.static(path.join(_dirname, "/frontend/dist")));
// app.get('*', (_,res) => {
//     res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
// });

// routes import 
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import reviewRouter from './routes/review.routes.js';

// routes declarations
app.use('/api/v1/users', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/review', reviewRouter);


export { app };