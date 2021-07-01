import express from "express";
import {
  getPorducts,
  getProductById,
  deleteProductById,
  updateProduct,
  addProduct,
  createReview
} from "../controllers/productController.js";
import {protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route("/").get(getPorducts).post(protect,admin,addProduct);
router.route("/:id").get(getProductById).delete(protect, admin, deleteProductById).put(protect,admin,updateProduct);
router.route("/:id/review").post(protect,createReview)
export default router;
