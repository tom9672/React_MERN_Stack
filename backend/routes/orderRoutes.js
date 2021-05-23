import express from "express";
import {
  addOrder,
  getOrderById,
  getAllOrders,
} from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/user/:id").get(protect, getAllOrders);

export default router;
