import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const insertData = async () => {
  try {
    // clear sample data
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    // insert sample data
    const createdUsers = await User.insertMany(users);
    const adminUserId = createdUsers[0]._id;

    const sampleProducts = products.map((p) => {
      return { ...p, user: adminUserId };
    });

    await Product.insertMany(sampleProducts);

    console.log("successfully insert sample data".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`ERROR: ${error.message}`.red.inverse);
  }
};
const destotyInsertedData = async () => {
  try {
    // clear sample data
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log("successfully destoty inserted sample data".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`ERROR: ${error.message}`.red.inverse);
  }
};

if (process.argv[2] === "-d") {
  destotyInsertedData();
} else {
  insertData();
}
