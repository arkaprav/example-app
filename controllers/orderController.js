const asyncHandler = require("express-async-handler");
const Orders = require("../models/orderModel");

//@desc Creates Orders
//@route /api/orders/create
//route private
const createOrders = asyncHandler( async (req, res) => {
    const adminId = req.user.id;
    const {
        products,
        orderTotal,
        orderDiscount,
        discountedPrize,
        amountPaid,
        customerID,
        mop,
    } = req.body;
    if(!products.length === 0){
        res.status(401);
        throw new Error("products are mandatory");
    }
    
    if(!orderTotal === ''){
        res.status(401);
        throw new Error("orderTotal is mandatory");
    }
    if(!orderDiscount === ''){
        res.status(401);
        throw new Error("orderDiscount is mandatory");
    }
    if(!discountedPrize === ''){
        res.status(401);
        throw new Error("discountedPrize is mandatory");
    }
    if(!amountPaid){
        res.status(401);
        throw new Error("amountPaid is mandatory");
    }
    if(!mop){
        res.status(401);
        throw new Error("mop is mandatory");
    }
    const order = await Orders.create({
        products: JSON.stringify(products),
        orderTotal,
        orderDiscount,
        discountedPrize,
        amountPaid,
        customerID,
        mop,
        adminId
    });
    res.status(201).json(order);
});

//@desc Get All Order
//@route /api/orders/all
//route private
const getAllOrders = asyncHandler( async (req, res) => {
    const orders = await Orders.find({ adminId: req.user.id });
    res.status(200).json(orders);
});

//@desc Get Single Orders
//@route /api/orders/:id
//route private
const getSingleOrders = asyncHandler( async (req, res) => {
    const Order = await Orders.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!Order){
        res.status(404);
        throw new Error("Order Not Found");
    }
    res.status(200).json(Order);
});

//@desc Update Single Orders
//@route /api/orders/:id
//route private
const updateSingleOrders = asyncHandler( async (req, res) => {
    const Order = await Orders.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!Order){
        res.status(404);
        throw new Error("Order Not Found");
    }
    const { products } = req.body;
    if(products){
        req.body.products = JSON.stringify(products);
    }
    const updatedOrder = await Orders.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updatedOrder);
});

module.exports = { createOrders, getAllOrders, getSingleOrders, updateSingleOrders };