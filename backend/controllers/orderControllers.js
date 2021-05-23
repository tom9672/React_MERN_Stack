import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//@desc create order
//@route POST/api/orders
//@access private
export const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no order data");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(201);
    res.json(createOrder);
  }
});

//@desc get order by id
//@route get/api/orders/:orderid
//@access private
export const getOrderById = asyncHandler(async (req, res) => {
  const orderDetail = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (orderDetail) {
    res.json(orderDetail);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc get all orders for user
// @route get/api/orders/:userid
// @access private
export const getAllOrders = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const orders = await Order.find({ user: userId });
  if (orders) {
    res.json(orders);
  } else res.json({ message: "No orders" });
});
