const express = require("express");
const { getAllAdmin, getSingleAdmin, updateSingleAdmin, DeleteSingleAdmin, createSingleAdmin } = require("../controllers/adminController");

const router = express.Router();

router.route("/all").get(getAllAdmin);
router.route("/").post(createSingleAdmin);
router.route("/:id").get(getSingleAdmin).put(updateSingleAdmin).delete(DeleteSingleAdmin);

module.exports = router;