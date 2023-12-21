const asyncHandler = require("express-async-handler");
const Frames = require("../models/FramesModel");

//@desc Creates Frames
//@route /api/frames/create
//route private
const createFrame = asyncHandler( async (req, res) => {
    const adminId = req.user.id;
    const { 
        code,
        name,
        brand,
        gender,
        color,
        size,
        type,
        shape,
        material,
        temple,
        bridge_size,
        hsn_code,
        tax,
        base_price,
        purchase_price,
        retail_price,
        discounted_price,
        inventory,
    } = req.body;
    if(
        !code ||
        !name ||
        !brand ||
        !gender ||
        !color ||
        !size === '' ||
        !type ||
        !shape ||
        !material ||
        !temple ||
        !bridge_size  === '' ||
        !hsn_code  === '' ||
        !tax  === '' ||
        !base_price  === '' ||
        !purchase_price  === '' ||
        !retail_price  === '' ||
        !discounted_price  === '' ||
        !inventory === '' 
    ){
        res.status(401);
        throw new Error("All Fields are mandatory");
    }
    const exists = await Frames.findOne({ code, name, brand, adminId });
    if(exists){
        res.status(401);
        throw new Error("Frame already exists");
    }
    const frame = await Frames.create({
        code,
        name,
        brand,
        gender,
        color,
        size,
        type,
        shape,
        material,
        temple,
        bridge_size,
        hsn_code,
        tax,
        base_price,
        purchase_price,
        retail_price,
        discounted_price,
        inventory,
        adminId
    });
    res.status(201).json(frame);
});

//@desc Get All Frames
//@route /api/frames/all
//route private
const getAllFrames = asyncHandler( async (req, res) => {
    const frames = await Frames.find({ adminId: req.user.id });
    res.status(200).json(frames);
});

//@desc Get Single Frame
//@route /api/frame/:id
//route private
const getSingleFrame = asyncHandler( async (req, res) => {
    const frame = await Frames.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!frame){
        res.status(404);
        throw new Error("Frame Not Found");
    }
    res.status(200).json(frame);
});

//@desc Update Single Frame
//@route /api/frames/:id
//route private
const updateSingleFrame = asyncHandler( async (req, res) => {
    const frame = await Frames.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!frame){
        res.status(404);
        throw new Error("Frame Not Found");
    }
    const updatedFrame = await Frames.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updatedFrame);
});

//@desc Delete Single Frame
//@route /api/frames/:id
//route private
const deleteSingleFrame = asyncHandler( async (req, res) => {
    const frame = await Frames.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!frame){
        res.status(404);
        throw new Error("User Not Found");
    }
    const deletedframe = await Frames.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json(deletedframe);
});

module.exports = { createFrame, getAllFrames, getSingleFrame, updateSingleFrame, deleteSingleFrame };