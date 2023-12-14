const express = require("express");
const validateToken = require("../middlewares/validateAdmin");
const { createStoreDetails, getSingleStoreDetails, updateSingleStoreDetails } = require("../controllers/storeDetailsController");

const router = express.Router();


router.use(validateToken);
router.route("/create").post(createStoreDetails);
router.route("/").get(getSingleStoreDetails).put(updateSingleStoreDetails);

module.exports = router;