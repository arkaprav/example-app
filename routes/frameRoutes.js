const express = require("express");
const validateToken = require("../middlewares/validateAdmin");
const { createFrame, getAllFrames, getSingleFrame, updateSingleFrame, deleteSingleFrame } = require("../controllers/FramesController");
const router = express.Router();


router.use(validateToken);
router.route("/create").post(createFrame);
router.route("/all").get(getAllFrames);
router.route("/:id").get(getSingleFrame).put(updateSingleFrame).delete(deleteSingleFrame);

module.exports = router;