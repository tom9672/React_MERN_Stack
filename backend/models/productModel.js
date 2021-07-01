import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, default: 5 },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    createdAt:{type:Date}
  },
  {
    timestampes: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 5 },
    reviews: [reviewSchema],
    numReviews:{type: Number,default: 0},
    quantity: { type: Number, required: true, default: 0 },
    img: { type: String, required: true },
  },
  {
    timestampes: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
