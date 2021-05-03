import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("success!");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

// app.use('/api/products', productRoutes)

app.listen(
  process.env.PORT,
  console.log(`server1 run on PORT: ${process.env.PORT}`.yellow)
);
