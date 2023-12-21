const asyncHandler = require("express-async-handler");
const Orders = require("../models/orderModel");
const Prescription = require("../models/prescriptionModel");

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
        delivaryStatus
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
    if(!amountPaid === ''){
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
        delivaryStatus,
        adminId
    });
    const data = {
        _id:order._id,
        products:JSON.parse(order.products),
        orderTotal:order.orderTotal,
        orderDiscount:order.orderDiscount,
        discountedPrize:order.discountedPrize,
        amountPaid:order.amountPaid,
        customerID:order.customerID,
        mop:order.mop,
        delivaryStatus:order.delivaryStatus,
        createdAt:order.createdAt,
        updatedAt:order.updatedAt,
        __v:order.__v,
    }
    res.status(201).json(data);
});

//@desc Get All Order
//@route /api/orders/all
//route private
const getAllOrders = asyncHandler( async (req, res) => {
    const orders = await Orders.find({ adminId: req.user.id });
    const pres = []
    for( let i = 0; i < orders.length; i++){
        const data = {
            _id:orders[i]._id,
            products:JSON.parse(orders[i].products),
            orderTotal:orders[i].orderTotal,
            orderDiscount:orders[i].orderDiscount,
            discountedPrize:orders[i].discountedPrize,
            amountPaid:orders[i].amountPaid,
            customerID:orders[i].customerID,
            mop:orders[i].mop,
            delivaryStatus:orders[i].delivaryStatus,
            createdAt:orders[i].createdAt,
            updatedAt:orders[i].updatedAt,
            __v:orders[i].__v,
        }
        pres.push(data);
    }
    res.status(200).json(pres);
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
    const data = {
        _id:Order._id,
        products:JSON.parse(Order.products),
        orderTotal:Order.orderTotal,
        orderDiscount:Order.orderDiscount,
        discountedPrize:Order.discountedPrize,
        amountPaid:Order.amountPaid,
        customerID:Order.customerID,
        mop:Order.mop,
        delivaryStatus:Order.delivaryStatus,
        createdAt:Order.createdAt,
        updatedAt:Order.updatedAt,
        __v:Order.__v,
    }
    res.status(200).json(data);
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
    if(products !== null){
        req.body.products = JSON.stringify(products);
    }
    const updatedOrder = await Orders.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updatedOrder);
});

//@desc Delete Single Orders
//@route /api/orders/:id
//route private
const deleteSingleOrders = asyncHandler( async (req, res) => {
    const order = await Orders.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!order){
        res.status(404);
        throw new Error("User Not Found");
    }
    const deletedOrders = await Orders.findByIdAndDelete(req.params.id, req.body);
    await Prescription.deleteMany({ orderId: req.params.id }).then(function(){
        console.log("Prescription Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    res.status(200).json(deletedOrders);
});

module.exports = { createOrders, getAllOrders, getSingleOrders, updateSingleOrders, deleteSingleOrders };