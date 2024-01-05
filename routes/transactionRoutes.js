const express = require("express");
const validateToken = require("../middlewares/validateAdmin");
const { createTransaction, getAllTransactions, getSingleTransaction, deleteTransaction } = require("../controllers/transactonController");
const router = express.Router();


router.use(validateToken);
router.route("/create").post(createTransaction);
router.route("/all").get(getAllTransactions);
router.route("/:id").get(getSingleTransaction).delete(deleteTransaction);

module.exports = router;