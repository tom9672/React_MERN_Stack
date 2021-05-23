import express from "express";
import {
  getPorducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getPorducts);
router.route("/:id").get(getProductById);

export default router;
