const {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");


const TransactionService = require("../../service/transactionServices");
const userPlanService = require("../../service/userPlanservices/index");

const transactionController = {
  transactionCreateOrder: async (req, res) => {
    try {
      const { memberId, planId } = req.body;

      if (!memberId) {
        throw new Error(
          ERROR_MESSAGE.MEMBER_ID_REQUIRED || "Member ID is required"
        );
      }
      if (!planId) {
        throw new Error(
          ERROR_MESSAGE.PLAN_ID_REQUIRED || "Plan ID is required"
        );
      }

      const result = await TransactionService.createOrder({
        memberId,
        planId,
      });


      //cahiye sirf transaction.id hee
      sendSuccessResponse(
        res,
        SUCCESS_MESSAGE.ORDER_CREATED || "Order created",
        result,
        200
      );
    } catch (error) {
      sendErrorResponse(
        res,
        error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
        "",
        500
      );
    }
  },

  transactionVerifyPayment: async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

      const result = await TransactionService.verifyPayment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      
     
     if (result && result.memberId && result.planId) {
      // Payment verified → Add user plan
      await userPlanService.createUserPlan(result.memberId, result.planId);
     }

      sendSuccessResponse(
        res,
        SUCCESS_MESSAGE.PAYMENT_VERIFIED || "Payment verified",
        result,
        200
      );
    } catch (error) {
      sendErrorResponse(
        res,
        error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
        "",
        500
      );
    }
  },

  getRazorpayKey: async (req, res) => {
    try {
      const result = await TransactionService.getRazorpayKeyService();

      sendSuccessResponse(
        res,
        SUCCESS_MESSAGE.RAZORPAY_KEY || "Razorpay Key",
        result,
        200
      );
    } catch (error) {
      sendErrorResponse(
        res,
        error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
        "",
        500
      );
    }
  },
};

module.exports = transactionController;
