const asyncHandler = require("express-async-handler");

const Admin = require("../models/adminModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

//@desc logs in Single Admin
//@route POST /api/admins/login
//@access public

const loginSingleAdmin = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(403);
        throw new Error("Invalid email or password");
    }
    const user = await Admin.findOne({ email });
    if(user && bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
            user: {
                id: user.id,
                email: user.email
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "365d" }
        );
        res.status(200).json(accessToken);
    }
    else{
        res.status(404);
        throw new Error("Invalid email or password");
    }
})

module.exports = { loginSingleAdmin };