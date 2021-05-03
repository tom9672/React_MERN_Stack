import express from "express";
import Product from "../models/productModel.js";
const reouter = express.Router();

//@desc request all products
//@route GET/api/products
//@access public
reouter.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: "Not Found" });
  }
});

//@desc request product by id
//@route GET/api/products/:id
//@access public
reouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: "Not Found" });
  }
});

export default reouter;
