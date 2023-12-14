const asyncHandler = require("express-async-handler");
const StoreDetails = require("../models/storeDetailModel");

//@desc Creates Store Details
//@route /api/storedetails/create
//route private
const createStoreDetails = asyncHandler( async (req, res) => {
    const adminId = req.user.id;
    const { name, address, phone } = req.body;
    if(!name || !address || !phone){
        res.status(401);
        throw new Error("All Fields are mandatory");
    }
    const exists = await StoreDetails.findOne({ adminId });
    if(exists){
        res.status(401);
        throw new Error("adminId already exists");
    }
    const storeDetails = await StoreDetails.create({
        name,
        address,
        phone,
        adminId
    });
    res.status(201).json(storeDetails);
});

//@desc Get All Store Details
//@route /api/storedetails/
//route private
const getSingleStoreDetails = asyncHandler( async (req, res) => {
    const storeDetails = await StoreDetails.findOne({ adminId: req.user.id });
    res.status(200).json(storeDetails);
});

//@desc Update Single Store Details
//@route /api/storedetails/
//route private
const updateSingleStoreDetails = asyncHandler( async (req, res) => {
    const storeDetails = await StoreDetails.findOne({ adminId: req.user.id });
    if(!storeDetails){
        res.status(404);
        throw new Error("storeDetails Not Found");
    }
    const updatedstoreDetails = await StoreDetails.findByIdAndUpdate(storeDetails._id, req.body);
    res.status(200).json(updatedstoreDetails);
});

module.exports = { createStoreDetails, getSingleStoreDetails, updateSingleStoreDetails };