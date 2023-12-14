const express = require("express");
const { getAllAdmin, getSingleAdmin, updateSingleAdmin, DeleteSingleAdmin, createSingleAdmin } = require("../controllers/adminController");
const { loginSingleAdmin } = require("../controllers/loginController");

const router = express.Router();

router.route("/all").get(getAllAdmin);
router.route("/create").post(createSingleAdmin);
router.route("/:id").get(getSingleAdmin).put(updateSingleAdmin).delete(DeleteSingleAdmin);
router.route("/login").post(loginSingleAdmin);

module.exports = router;