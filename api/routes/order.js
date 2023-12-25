import express from "express"
import { createOrder, getOrders } from "../controllers/order.js"

const router = express.Router();
//CREATE
router.post("/", createOrder);
router.get("/", getOrders);

export default router