const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");

//@desc Gets All Admin
//@route GET /api/admins/all
//@access public

const getAllAdmin = asyncHandler( async (req, res) => {
    const admin = await Admin.find();
    res.status(200).json(admin);
});

//@desc Gets Single Admin
//@route GET /api/admins/:id
//@access public

const getSingleAdmin = asyncHandler( async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    res.status(200).json(admin);
})

//@desc Update Single Admin
//@route put /api/admins/:id
//@access public

const updateSingleAdmin = asyncHandler( async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if(!admin) {
        res.status(404);
        throw new Error("Admin Not Found");
    }
    const updatedAdmin = await Admin.findByIdAndUpdate( req.params.id, req.body, { new: true } );
    res.status(200).json(updatedAdmin);
});


//@desc Deletes All Admin
//@route DELETE /api/admins/:id
//@access public

const DeleteSingleAdmin = asyncHandler( async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if(!admin) {
        res.status(404);
        throw new Error("Admin Not Found");
    }
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedAdmin);
});


//@desc Create Admin
//@route POST /api/admins/
//@access public

const createSingleAdmin = asyncHandler( async (req, res) => {
    const { email, password } = await req.body;
    if(!email || !password){
        res.status(404);
        throw new Error("All Fields are mandatory");
    }
    const exists = await Admin.find({ email });
    if(exists.length !== 0){
        res.status(403);
        throw new Error("Admin Email already Exists");
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
        email,
        password: hashedPass
    });
    res.status(200).json(admin);
});


module.exports = { getAllAdmin, getSingleAdmin, updateSingleAdmin, DeleteSingleAdmin, createSingleAdmin };