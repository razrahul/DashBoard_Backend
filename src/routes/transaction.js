const express = require("express");

const TransactionController = require('../controller/transaction');

const router = express.Router();


router.post("/create-order", TransactionController.transactionCreateOrder);
router.post("/verify-payment", TransactionController.transactionVerifyPayment);

router.get("/razorpay-key", TransactionController.getRazorpayKey);


module.exports = router;
