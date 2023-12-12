const mongoose = require("mongoose");

const userModel = mongoose.Schema({
        name:{
            type: String,
            required: [true, "Name is required"]
        },
        address:{
            type: String,
            required: [true, "Mobile is required"]
        },
        email:{
            type: String,
            required: [true, "Mobile is required"]
        },
        phone:{
            type: Number,
            required: [true, "Mobile is required"]
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userModel);