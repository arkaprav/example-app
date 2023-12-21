const mongoose = require("mongoose");

const orderModel = mongoose.Schema(
    {
        products:{
            type: String,
            required: [true, "products is required"],
        },
        orderTotal:{
            type: Number,
            required: [true, "orderTotal is required"],
            default: 0,
        },
        orderDiscount:{
            type: Number,
            required: [true, "orderDiscount is required"],
            default: 0,
        },
        discountedPrize:{
            type: Number,
            required: [true, "discountedPrize is required"],
            default: 0,
        },
        amountPaid:{
            type: Number,
            required: [true, "amountPaid is required"],
            default: 0,
        },
        customerID:{
            type: String,
            required: [true, "customerID is required"],
        },
        mop:{
            type: String,
            required: [true, "mop is required"],
        },
        delivaryStatus:{
            type: String,
            required: [true, "delivaryStatus is required"],
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

module.exports = mongoose.model("Orders", orderModel);