const mongoose = require("mongoose");

const storeDetailsModel = mongoose.Schema({
        name:{
            type: String,
            required: [true, "Name is required"]
        },
        address:{
            type: String,
            required: [true, "Mobile is required"]
        },
        phone:{
            type: Number,
            required: [true, "Mobile is required"]
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

module.exports = mongoose.model("StoreDetails", storeDetailsModel);