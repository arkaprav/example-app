const asyncHandler = require("express-async-handler");
const transactionModel = require("../models/transactionsModel");
const orderModel = require("../models/orderModel");

const getAllTransactions = asyncHandler( async (req, res) => {
    const transactions = await transactionModel.find({ adminId: req.user.id });
    const pres = []
    for( let i = 0; i < transactions.length; i++){
        const data = {
            _id:transactions[i]._id,
            orderId: transactions[i].orderId,
            mop: transactions[i].mop,
            amountPaid: transactions[i].amountPaid,
            profit: transactions[i].profit,
            createdAt:transactions[i].createdAt,
            updatedAt:transactions[i].updatedAt,
            __v:transactions[i].__v,
        }
        pres.push(data);
    }
    res.status(200).json(pres);
});

const getSingleTransaction = asyncHandler( async (req, res) => {
    const transaction = await transactionModel.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!transaction){
        res.status(404);
        throw new Error("Transaction Not Found");
    }
    const data = {
        _id:transaction._id,
        orderId: transaction.orderId,
        mop: transaction.mop,
        amountPaid: transaction.amountPaid,
        profit: transaction.profit,
        createdAt:transaction.createdAt,
        updatedAt:transaction.updatedAt,
        __v:transaction.__v,
    };
    res.status(200).json(data);
});

const createTransaction = asyncHandler( async (req, res) => {
    const { orderId, mop, amountPaid, profit } = req.body;
    const order = await orderModel.findOne({ _id: orderId, adminId: req.user.id });
    if(!order){
        res.status(404);
        throw new Error("Order Not Found");
    }
    if(!mop){
        res.status(401);
        throw new Error("Mode of payment is required (mop)");
    }
    if(typeof(amountPaid) === String){
        res.status(401);
        throw new Error("Paid Amount is required and should be in numbers (amountPaid)");
    }
    if(typeof(profit) === String){
        res.status(401);
        throw new Error("Profit is required and should be in numbers");
    }
    const transaction = await transactionModel.create({
        orderId,
        mop,
        amountPaid,
        profit,
        adminId: req.user.id
    });
    const data = {
        _id:transaction._id,
        orderId: transaction.orderId,
        mop: transaction.mop,
        amountPaid: transaction.amountPaid,
        profit: transaction.profit,
        createdAt:transaction.createdAt,
        updatedAt:transaction.updatedAt,
        __v:transaction.__v,
    };
    res.status(200).json(data);
});

const deleteTransaction = asyncHandler( async (req, res) => {
    const transaction = await transactionModel.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!transaction){
        res.status(404);
        throw new Error("transaction not found");
    }
    const deletedTransaction = await transactionModel.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json(deletedTransaction);
});

module.exports = { getAllTransactions, getSingleTransaction, createTransaction, deleteTransaction };