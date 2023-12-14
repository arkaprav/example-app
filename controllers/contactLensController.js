const asyncHandler = require("express-async-handler");
const ContactLens = require("../models/contactLensModel");

//@desc Creates Lens
//@route /api/lenses/create
//route private
const createContactLens = asyncHandler( async (req, res) => {
    console.log("body: ",req.body);
    const adminId = req.user.id;
    const { 
        code,
        name,
        brand,
        color,
        power,
        quality,
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
        !power === '' ||
        !quality === '' ||
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
    const exists = await ContactLens.findOne({ code, name, brand, adminId });
    console.log("available: ",exists);
    if(exists){
        res.status(401);
        throw new Error("Contact Lens already exists");
    }
    const frame = await ContactLens.create({
        code,
        name,
        brand,
        color,
        power,
        quality,
        hsn_code,
        tax,
        base_price,
        purchase_price,
        retail_price,
        discounted_price,
        inventory,
        adminId
    });
    console.log("created: ",frame);
    res.status(201).json(frame);
});

//@desc Get All lenses
//@route /api/lenses/all
//route private
const getAllContactLenses = asyncHandler( async (req, res) => {
    const lenses = await ContactLens.find({ adminId: req.user.id });
    res.status(200).json(lenses);
});

//@desc Get Single Lens
//@route /api/lenses/:id
//route private
const getSingleContactLens = asyncHandler( async (req, res) => {
    const lens = await ContactLens.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!lens){
        res.status(404);
        throw new Error("Contact Lens Not Found");
    }
    res.status(200).json(lens);
});

//@desc Update Single lens
//@route /api/lenses/:id
//route private
const updateSingleContactLens = asyncHandler( async (req, res) => {
    const lens = await ContactLens.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!lens){
        res.status(404);
        throw new Error("Contact Lens Not Found");
    }
    const updatedLens = await ContactLens.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updatedLens);
});

//@desc Delete Single Lens
//@route /api/lenses/:id
//route private
const deleteSingleContactLens = asyncHandler( async (req, res) => {
    const lens = await ContactLens.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!lens){
        res.status(404);
        throw new Error("Contact Lens Not Found");
    }
    const deletedLens = await ContactLens.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json(deletedLens);
});

module.exports = { createContactLens, getAllContactLenses, getSingleContactLens, updateSingleContactLens, deleteSingleContactLens };