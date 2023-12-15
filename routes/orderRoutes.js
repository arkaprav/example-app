const express = require("express");
const validateToken = require("../middlewares/validateAdmin");
const { createOrders, getAllOrders, getSingleOrders, updateSingleOrders, deleteSingleOrders } = require("../controllers/orderController");
const router = express.Router();


router.use(validateToken);
router.route("/create").post(createOrders);
router.route("/all").get(getAllOrders);
router.route("/:id").get(getSingleOrders).put(updateSingleOrders).delete(deleteSingleOrders);

module.exports = router;