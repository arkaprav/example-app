const asyncHandler = require("express-async-handler");

const Users = require("../models/userModel");

//@desc Gets All Users
//@route GET /api/users/all
//@access public

const getAllUser = asyncHandler( async (req, res) => {
    const users = await Users.find();
    res.status(200).json(users);
});

//@desc Gets Single User
//@route GET /api/users/:id
//@access public

const getSingleUser = asyncHandler( async (req, res) => {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
})

//@desc Update Single User
//@route put /api/users/:id
//@access public

const updateSingleUser = asyncHandler( async (req, res) => {
    const user = await Users.findById(req.params.id);
    if(!user) {
        res.status(404);
        throw new Error("User Not Found");
    }
    const updatedUser = await Users.findByIdAndUpdate( req.params.id, req.body, { new: true } );
    res.status(200).json(updatedUser);
});


//@desc Deletes All Users
//@route DELETE /api/users/:id
//@access public

const DeleteSingleUser = asyncHandler( async (req, res) => {
    const user = await Users.findById(req.params.id);
    if(!user) {
        res.status(404);
        throw new Error("User Not Found");
    }
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
});


//@desc Create User
//@route POST /api/users/
//@access public

const createSingleUser = asyncHandler( async (req, res) => {
    const { name, email, address, phone } = await req.body;
    if(!name || !email || !address || !phone){
        res.status(404);
        throw new Error("All Fields are mandatory");
    }
    const user = await Users.create({
        name,
        email,
        address,
        phone
    });
    res.status(200).json(user);
});


module.exports = { getAllUser, getSingleUser, updateSingleUser, DeleteSingleUser, createSingleUser };