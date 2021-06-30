import express from "express";
import {
  addOrder,
  getOrderById,
  getAllOrders,
  gerOrders
} from "../controllers/orderControllers.js";
import { protect,admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrder).get(protect,admin,gerOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/user/:id").get(protect, getAllOrders);

export default router;
