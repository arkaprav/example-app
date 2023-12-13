const express = require("express");
const validateToken = require("../middlewares/validateAdmin");
const { createUser, getAllUser, getSingleUser, updateSingleUser, deleteSingleUser } = require("../controllers/userControllers");
const router = express.Router();


router.use(validateToken);
router.route("/create").post(createUser);
router.route("/all").get(getAllUser);
router.route("/:id").get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser);

module.exports = router;