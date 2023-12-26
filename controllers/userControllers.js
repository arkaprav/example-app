const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");

//@desc Creates User
//@route /api/users/create
//route private
const createUser = asyncHandler( async (req, res) => {
    const adminId = req.user.id;
    const { name, address, email, phone } = req.body;
    if(!name || !address || !email || !phone){
        res.status(401);
        throw new Error("All Fields are mandatory");
    }
    const user = await Users.create({
        name,
        address,
        email,
        phone,
        adminId
    });
    res.status(201).json(user);
});

//@desc Get All Users
//@route /api/users/all
//route private
const getAllUser = asyncHandler( async (req, res) => {
    const users = await Users.find({ adminId: req.user.id });
    res.status(200).json(users);
});

//@desc Get Single Users
//@route /api/users/:id
//route private
const getSingleUser = asyncHandler( async (req, res) => {
    const user = await Users.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!user){
        res.status(404);
        throw new Error("User Not Found");
    }
    res.status(200).json(user);
});

//@desc Update Single User
//@route /api/users/:id
//route private
const updateSingleUser = asyncHandler( async (req, res) => {
    const user = await Users.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!user){
        res.status(404);
        throw new Error("User Not Found");
    }
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updatedUser);
});

//@desc Delete Single User
//@route /api/users/:id
//route private
const deleteSingleUser = asyncHandler( async (req, res) => {
    const user = await Users.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!user){
        res.status(404);
        throw new Error("User Not Found");
    }
    const deletedUser = await Users.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json(deletedUser);
});

module.exports = { createUser, getAllUser, getSingleUser, updateSingleUser, deleteSingleUser };