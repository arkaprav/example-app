const express = require("express");
const validateToken = require("../middlewares/validateAdmin");
const { createContactLens, getAllContactLenses, getSingleContactLens, updateSingleContactLens, deleteSingleContactLens } = require("../controllers/contactLensController");
const router = express.Router();


router.use(validateToken);
router.route("/create").post(createContactLens);
router.route("/all").get(getAllContactLenses);
router.route("/:id").get(getSingleContactLens).put(updateSingleContactLens).delete(deleteSingleContactLens);

module.exports = router;