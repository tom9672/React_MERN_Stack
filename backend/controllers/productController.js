import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc request all products
//@route GET/api/products
//@access public
export const getPorducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc request product by id
//@route GET/api/products/:id
//@access public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Not found");
  }
});