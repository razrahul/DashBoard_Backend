const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
} = require('../../utils/propertyResolver');

const crypto = require("crypto");

const Transaction = require('../../models/Transaction');
const Plan = require('../../models/Plan');
const User = require('../../models/User');
const razorpay = require('../payment/razorpay');

const TransactionService = {
    createOrder: async ({memberId, planId}) => {
        try{
            if(!planId){
                throw new Error(ERROR_MESSAGE.PLAN_ID_REQUIRED || "Plan ID is required");
            }

            const plan = await Plan.findByPk(planId);
            if(!plan){
                throw new Error(ERROR_MESSAGE.PLAN_NOT_FOUND || "Plan not found");
            }

            const amount = parseFloat(plan.minimumInvestment) * 100; // Razorpay in paise
            
            const options  = {
                amount,
                currency: "INR",
                receipt: `receipt_${Date.now()}`, 
            };

            const order = await razorpay.orders.create(options);

            if(!order.id){
                throw new Error(ERROR_MESSAGE.ORDER_CREATION_FAILED || "Order creation failed");
            }

            // Save transaction with "created" status
            const transaction = await Transaction.create({
            memberId,
            planId,
            transactionType: "investment",
            transactionAmount: plan.minimumInvestment,
            transactionStatus: order.status || "created", // razorpay ka status le lo (created by default hota hai)
            razorpayOrderId: order.id,
            currency: order.currency,
            });

            return { order, transaction };
            
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },

    verifyPayment: async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
        try {
            const body = razorpay_order_id + "|" + razorpay_payment_id;

            const expectedSign = crypto
                .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
                .update(body)
                .digest("hex");

            if (razorpay_signature !== expectedSign) {
                throw new Error(ERROR_MESSAGE.INVALID_SIGNATURE || "Invalid signature");
            }
            // Update transaction
            const txn = await Transaction.findOne({ where: { razorpayOrderId: razorpay_order_id } });
            if(!txn){
                throw new Error(ERROR_MESSAGE.TRANSACTION_NOT_FOUND || "Transaction not found");
            }

            // 🔹 Razorpay से full payment detail लो
            const payment = await razorpay.payments.fetch(razorpay_payment_id);

            txn.razorpayPaymentId = razorpay_payment_id;
            txn.razorpaySignature = razorpay_signature;
            txn.transactionStatus = payment.status === "captured" ? "success" : "pending";
            txn.currency = payment.currency;
            txn.paymentStatus = payment.status; // authorized / captured / failed
            txn.capturedAt = payment.captured_at ? new Date(payment.captured_at * 1000) : null;
            
            await txn.save();

            return txn;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },

    getRazorpayKeyService : async () => {
        try {
            return { 
            RAZORPAY_KEY_ID : process.env.RAZORPAY_KEY_ID 
            };
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    }


    
};  

module.exports = TransactionService;