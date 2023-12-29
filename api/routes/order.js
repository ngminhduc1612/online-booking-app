import express from "express"
import { createOrder, getOrder, getOrders } from "../controllers/order.js"
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:id", createOrder);
router.get("/", verifyAdmin, getOrders);
router.get("/:id", verifyAdmin, getOrder);

export default router