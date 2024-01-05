const mongoose = require("mongoose");

const transactionModel = mongoose.Schema(
    {
        orderId: {
            type: String,
            required: [true, "orderId is required"]
        },
        mop: {
            type: String,
            required: [true, "mop is required"]
        },
        amountPaid: {
            type: Number,
            required: [true, "amountPaid is required"]
        },
        profit: {
            type: Number,
            required: [true, "profit is required"]
        },
        adminId:{
            type: String,
            required:[true, "Admin ID is required"]
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Transactions", transactionModel);