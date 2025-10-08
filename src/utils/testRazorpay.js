require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const crypto = require("crypto");


const orderId = "order_NgQXg9bLwxxxx";
const paymentId = "pay_NgQvZZ9bLwxxxx";
const secret = process.env.RAZORPAY_SECRET_KEY; // process.env.RAZORPAY_SECRET_KEY

const body = orderId + "|" + paymentId;

const expectedSign = crypto
  .createHmac("sha256", secret)
  .update(body)
  .digest("hex");

console.log("Signature:", expectedSign);
