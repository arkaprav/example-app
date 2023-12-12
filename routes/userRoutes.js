const express = require("express");
const { getAllUser, getSingleUser, updateSingleUser, DeleteSingleUser, createSingleUser } = require("../controllers/userController");

const router = express.Router();

router.route("/all").get(getAllUser);
router.route("/").post(createSingleUser);
router.route("/:id").get(getSingleUser).put(updateSingleUser).delete(DeleteSingleUser);

module.exports = router;