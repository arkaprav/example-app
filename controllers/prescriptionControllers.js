const asyncHandler = require("express-async-handler");
const Prescriptions = require("../models/prescriptionModel");

//@desc Creates Prescription
//@route /api/prescriptions/create
//route private
const createPrescription = asyncHandler( async (req, res) => {
    const adminId = req.user.id;
    const { customerID, lensID, lenstype, orderId, prescription } = req.body;
    if(!prescription.length === 0){
        res.status(401);
        throw new Error("products are mandatory");
    }
    
    if(!lensID === ''){
        res.status(401);
        throw new Error("lensID is mandatory");
    }
    if(!lenstype === ''){
        res.status(401);
        throw new Error("lenstype is mandatory");
    }
    if(!orderId === ''){
        res.status(401);
        throw new Error("orderId is mandatory");
    }
    if(!customerID === ''){
        res.status(401);
        throw new Error("discountedPrize is mandatory");
    }
    const pres = await Prescriptions.create({
        prescription: JSON.stringify(prescription),
        lensID,
        lenstype,
        customerID,
        orderId,
        adminId
    });
    res.status(201).json(pres);
});

//@desc Get All Prescriptions
//@route /api/prescriptions/all
//route private
const getAllPrescription = asyncHandler( async (req, res) => {
    const prescriptions = await Prescriptions.find({ adminId: req.user.id });
    const pres = []
    for( let i = 0; i < prescriptions.length; i++){
        const data = {
            _id:prescriptions[i]._id,
            customerID:prescriptions[i].customerID,
            lensID:prescriptions[i].lensID,
            lenstype:prescriptions[i].lenstype,
            prescription:JSON.parse(JSON.parse(prescriptions[i].prescription)),
            orderId:prescriptions[i].orderId,
            adminId:prescriptions[i].adminId,
            createdAt:prescriptions[i].createdAt,
            updatedAt:prescriptions[i].updatedAt,
            __v:prescriptions[i].__v,
        }
        pres.push(data);
    }
    res.status(200).json(pres);
});

//@desc Get Single Prescription
//@route /api/prescriptions/:id
//route private
const getSinglePrescription = asyncHandler( async (req, res) => {
    const pres = await Prescriptions.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!pres){
        res.status(404);
        throw new Error("prescription Not Found");
    }
    const data = {
        _id:pres._id,
        customerID:pres.customerID,
        lensID:pres.lensID,
        lenstype:pres.lenstype,
        prescription:JSON.parse(JSON.parse(pres.prescription)),
        orderId:pres.orderId,
        adminId:pres.adminId,
        createdAt:pres.createdAt,
        updatedAt:pres.updatedAt,
        __v:pres.__v,
    }
    res.status(200).json(data);
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

//@desc Delete Single Prescription
//@route /api/prescriptions/:id
//route private
const deleteSinglePrescription = asyncHandler( async (req, res) => {
    const prescription = await Prescriptions.findOne({ _id: req.params.id, adminId: req.user.id });
    if(!prescription){
        res.status(404);
        throw new Error("Prescription Not Found");
    }
    const deletedPrescription = await Prescriptions.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json(deletedPrescription);
});

module.exports = { createPrescription, getAllPrescription, getSinglePrescription, updateSinglePrescription, deleteSinglePrescription };