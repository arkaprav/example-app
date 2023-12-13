const mongoose = require("mongoose");

const adminModel = mongoose.Schema({
        email:{
            type: String,
            required: [true, "Email is required"]
        },
        password: {
            type: String,
            required: [true, "password is required"]
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Admin", adminModel);