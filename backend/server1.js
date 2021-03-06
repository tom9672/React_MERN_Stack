import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from './routes/uploadsRoutes.js'
import path from 'path'
import morgan from 'morgan'

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

app.use("/api/config/paypal_client_id", (req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID)
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound);
app.use(errorHandler);

app.listen(
  process.env.PORT,
  console.log(`server1 run on PORT: ${process.env.PORT}`.yellow)
);
