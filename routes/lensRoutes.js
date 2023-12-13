const express = require("express");
const validateToken = require("../middlewares/validateAdmin");
const { createLens, getAllLenses, getSingleLens, updateSingleLens, deleteSingleLens } = require("../controllers/LensController");
const router = express.Router();


router.use(validateToken);
router.route("/create").post(createLens);
router.route("/all").get(getAllLenses);
router.route("/:id").get(getSingleLens).put(updateSingleLens).delete(deleteSingleLens);

module.exports = router;