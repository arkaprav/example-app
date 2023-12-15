const asyncHandler = require("express-async-handler");
const Lens = require("../models/LensModel");

//@desc Creates Lens
//@route /api/lenses/create
//route private
const createLens = asyncHandler( async (req, res) => {
    console.log(req.body);
    const adminId = req.user.id;
    const { 
        code,
        name,
        brand,
        color,
        coating,
        design,
        index,
        quality,
        material,
        hsn_code,
        tax,
        base_price,
        purchase_price,
        retail_price,
        discounted_price,
        inventory
    } = req.body;
    if(
        !code||
        !name||
        !brand||
        !color||
        !coating||
        !design||
        !index === '' ||
        !quality === '' ||
        !material||
        !hsn_code === '' ||
        !tax === '' ||
        !base_price === '' ||
        !purchase_price === '' ||
        !retail_price === '' ||
        !discounted_price === '' ||
        !inventory === '' 
    ){
        res.status(401);
        throw new Error("All Fields are mandatory");
    }
    const exists = await Lens.findOne({ code, name, brand, adminId });
    console.log(exists);
    if(exists){
        res.status(401);
        throw new Error("Frame already exists");
    }
    const lens = await Lens.create({
        code,
        name,
        brand,
        color,
        coating,
        design,
        ind:index,
        quality,
        material,
        hsn_code,
        tax,
        base_price,
        purchase_price,
        retail_price,
        discounted_price,
        inventory,
        adminId
    });
    console.log(lens);
    res.status(201).json(lens);
});

//@desc Get All lenses
//@route /api/lenses/all
//route private
const getAllLenses = asyncHandler( async (req, res) => {
    const lenses = await Lens.find({ adminId: req.user.id });
    res.status(200).json(lenses);
});

//@desc Get Single Lens
//@route /api/lenses/:id
//route private
const getSingleLens = asyncHandler( async (req, res) => {
    const lens = await Lens.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!lens){
        res.status(404);
        throw new Error("Frame Not Found");
    }
    res.status(200).json(lens);
});

//@desc Update Single lens
//@route /api/lenses/:id
//route private
const updateSingleLens = asyncHandler( async (req, res) => {
    const lens = await Lens.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!lens){
        res.status(404);
        throw new Error("lens Not Found");
    }
    const updatedLens = await Lens.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updatedLens);
});

//@desc Delete Single Lens
//@route /api/lenses/:id
//route private
const deleteSingleLens = asyncHandler( async (req, res) => {
    const lens = await Lens.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!lens){
        res.status(404);
        throw new Error("User Not Found");
    }
    const deletedLens = await Lens.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json(deletedLens);
});

module.exports = { createLens, getAllLenses, getSingleLens, updateSingleLens, deleteSingleLens };