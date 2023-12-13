const mongoose = require("mongoose");

const framesModel = mongoose.Schema(
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
        gender:{
            type: String,
            required: [true, "gender is required"]
        },
        color:{
            type: String,
            required: [true, "color is required"]
        },
        size:{
            type: Number,
            required: [true, "size is required"]
        },
        shape:{
            type: String,
            required: [true, "shape is required"]
        },
        type:{
            type: String,
            required: [true, "type is required"]
        },
        material:{
            type: String,
            required: [true, "material is required"]
        },
        temple:{
            type: String,
            required: [true, "temple is required"]
        },
        bridge_size:{
            type: Number,
            required: [true, "bridge_size is required"]
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

module.exports = mongoose.model("Frames", framesModel);