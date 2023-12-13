const express = require("express");
const validateToken = require("../middlewares/validateAdmin");
const { createPrescription, getAllPrescription, getSinglePrescription, updateSinglePrescription } = require("../controllers/prescriptionControllers");
const router = express.Router();


router.use(validateToken);
router.route("/create").post(createPrescription);
router.route("/all").get(getAllPrescription);
router.route("/:id").get(getSinglePrescription).put(updateSinglePrescription);

module.exports = router;