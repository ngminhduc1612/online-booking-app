import Order from "../models/Order.js";

export const createOrder = async (req,res,next)=>{
    const newOrder = new Order(req.body)
    
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (err) {
        next(err)
    }
}
export const getOrders = async (req,res,next)=>{
    try {
        const Orders = await Order.find();
        res.status(200).json(Orders)
    } catch (err) {
        next(err)
    }
}
