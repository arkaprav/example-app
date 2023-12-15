const mongoose = require("mongoose");

const prescriptionModel = mongoose.Schema(
    {
        customerID: {
            type: String,
            required: [true, "customerID is required"]
        },
        lensID: {
            type: String,
            required: [true, "lensID is Required"]
        },
        lenstype: {
            type: String,
            required: [true, "lenstype is required"]
        },
        prescription: {
            type: String,
            required: [true, "prescription is required"]
        },
        orderId: {
            type: String,
            required: [true, "orderId is required"]
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

module.exports = mongoose.model("Prescriptions", prescriptionModel);