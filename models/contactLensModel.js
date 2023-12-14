const mongoose = require("mongoose");

const contactLensModel = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "name is required"]
        },
        brand:{
            type: String,
            required: [true, "brand is required"]
        },
        code:{
            type: String,
            required: [true, "code is required"]
        },
        color:{
            type: String,
            required: [true, "color is required"]
        },
        power:{
            type: Number,
            required: [true, "power is required"]
        },
        quality:{
            type: Number,
            required: [true, "quality is required"]
        },
        hsn_code:{
            type: Number,
            required: [true, "hsn_code is required"]
        },
        tax:{
            type: Number,
            default: 0
        },
        base_price:{
            type: Number,
            default: 0
        },
        purchase_price:{
            type: Number,
            default: 0
        },
        retail_price:{
            type: Number,
            default: 0
        },
        discounted_price:{
            type: Number,
            default: 0
        },
        inventory:{
            type: Number,
            default: 0
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

module.exports = mongoose.model("ContactLens", contactLensModel);