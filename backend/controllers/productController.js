import e from "express";
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


//@desc delete product by id
//@route DELETE/api/products/:id
//@access private(admin only)
export const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove()
    res.json({message:'Product successfully delete'});
  } else {
    res.status(404);
    throw new Error("Not found");
  }
});

//@desc add product
//@route post/api/products
//@access private(admin only)
export const addProduct = asyncHandler(async (req, res) => {
  // create a template of product
  const product = new Product({
    name:'sample product name',
    price:0,
    user:req.user._id,
    img:'sample product image',
    category:'sample product category',
    quantity:0,
    description:'sample product description'
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
  
});

//@desc edit product
//@route put/api/products/:id
//@access private(admin only)
export const updateProduct = asyncHandler(async (req, res) => {

  const {name,price, description, image, category, quantity} = req.body

  const product = await Product.findById(req.params.id)
  
  if(product){
    product.name = name
    product.price = price
    product.description = description
    product.img = image
    product.category = category
    product.quantity = quantity

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)

  }else{
    res.status(404)
    res.json('Not found product')
  }
  
});


//@desc create review
//@route POST/api/products/:id/reviews
//@access private
export const createReview = asyncHandler(async (req,res)=>{
  const {rating, comment, } = req.body
  const product = await Product.findById(req.params.id)
  if(product){
    const alreadyReviewed = product.reviews.find((review)=>review.user.toString() === req.user._id.toString())
    if(alreadyReviewed){
      res.status(400)
      throw new Error('You already post review for this product')
    }else{
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user:req.user._id
      }
      product.reviews.push(review)
      // update count of reviews and avg rating
      product.numReviews = product.reviews.length
      product.rating = product.reviews.reduce((acc,review)=>acc+review.rating,0) / product.reviews.length

      await product.save()
      res.status(201).json({message:'Review successful'})
    }
    
  }else{
    res.status(404)
    throw new Error('Not found product')
  }
})