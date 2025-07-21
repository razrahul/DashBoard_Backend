const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
} = require("../../utils/propertyResolver");

const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../../utils/response");

const userPlanServices = require("../../service/userPlanservices");

const userPlanController = {

    createUserPlan: async (req, res) => {
        try {
            const { memberId, planId } = req.body;

            if (!memberId || !planId) {
                throw new Error(ERROR_MESSAGE.MISSING_REQUIRED_FIELDS || "Member ID and Plan ID are required.");
            }

            const newUserPlan = await userPlanServices.createUserPlan(memberId, planId);
            sendSuccessResponse(res, SUCCESS_MESSAGE.USER_PLAN_CREATED_SUCCESSFULLY || "User Plan created successfully.", newUserPlan, 201);
        } catch (error) {
            sendErrorResponse(res, error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG, error.message, 500);
        }
    },

    getAllUserPlans: async (req, res) => {
        try {
            const userPlans = await userPlanServices.getAllUserPlans();
            sendSuccessResponse(res, SUCCESS_MESSAGE.USER_PLANS_FETCHED_SUCCESSFULLY || "User Plans fetched successfully.", userPlans, 200);
        } catch (error) {
            sendErrorResponse(res, error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG, error.message, 500);
        }
    },

    getUserPlanById: async (req, res) => {
        try {
            const { id } = req.params;
            const userPlanData = await userPlanServices.getUserPlanById(id);

            if (!userPlanData) {
                throw new Error(ERROR_MESSAGE.USER_PLAN_NOT_FOUND || "User Plan not found.");
            }

            sendSuccessResponse(res, SUCCESS_MESSAGE.USER_PLAN_FETCHED_SUCCESSFULLY || "User Plan fetched successfully.", userPlanData, 200);
        } catch (error) {
            sendErrorResponse(res, error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG, error.message, 500);
        }
    },
};

module.exports = userPlanController;
