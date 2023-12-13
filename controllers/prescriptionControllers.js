const asyncHandler = require("express-async-handler");
const Prescriptions = require("../models/prescriptionModel");

//@desc Creates Prescription
//@route /api/prescriptions/create
//route private
const createPrescription = asyncHandler( async (req, res) => {
    const adminId = req.user.id;
    const { customerID, lensID, lenstype, prescription } = req.body;
    if(!prescription.length === 0){
        res.status(401);
        throw new Error("products are mandatory");
    }
    
    if(!lensID === ''){
        res.status(401);
        throw new Error("orderTotal is mandatory");
    }
    if(!lenstype === ''){
        res.status(401);
        throw new Error("orderDiscount is mandatory");
    }
    if(!customerID === ''){
        res.status(401);
        throw new Error("discountedPrize is mandatory");
    }
    const order = await Prescriptions.create({
        prescription: JSON.stringify(prescription),
        lensID,
        lenstype,
        customerID,
        adminId
    });
    res.status(201).json(order);
});

//@desc Get All Prescriptions
//@route /api/prescriptions/all
//route private
const getAllPrescription = asyncHandler( async (req, res) => {
    const prescriptions = await Prescriptions.find({ adminId: req.user.id });
    res.status(200).json(prescriptions);
});

//@desc Get Single Prescription
//@route /api/prescriptions/:id
//route private
const getSinglePrescription = asyncHandler( async (req, res) => {
    const prescription = await Prescriptions.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!prescription){
        res.status(404);
        throw new Error("prescription Not Found");
    }
    res.status(200).json(prescription);
});

//@desc Update Single Prescription
//@route /api/prescriptions/:id
//route private
const updateSinglePrescription = asyncHandler( async (req, res) => {
    const Prescription = await Prescriptions.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!Prescription){
        res.status(404);
        throw new Error("Prescription Not Found");
    }
    const { prescription } = req.body;
    if(prescription){
        req.body.prescription = JSON.stringify(prescription);
    }
    const updatedPrescription = await Prescriptions.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updatedPrescription);
});

module.exports = { createPrescription, getAllPrescription, getSinglePrescription, updateSinglePrescription };