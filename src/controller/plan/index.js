const {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} = require("../../utils/propertyResolver");

const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/response");

const planServices = require("../../service/planServices");

const createPlan = async (req, res) => {
  try {
    const { planName, planTitle, planDescription, minimumInvestment } =
      req.body;

    if (!planName || !minimumInvestment) {
      throw new Error(
        ERROR_MESSAGE.MISSING_REQUIRED_FIELDS ||
          "Plan name and minimum investment are required."
      );
    }
    const planData = {
      planName,
      planTitle,
      planDescription,
      minimumInvestment,
    };
    const newPlan = await planServices.createPlan(planData);

    sendSuccessResponse(
      res,
      SUCCESS_MESSAGE.PLAN_CREATED_SUCCESSFULLY,
      newPlan,
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
};

// get All plans
const getAllPlans = async (req, res) => {
  try {
    const plans = await planServices.getAllPlans();
    sendSuccessResponse(res, SUCCESS_MESSAGE.PLANS_FETCHED_SUCCESSFULLY, plans, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

//get plan by id
const getPlanById = async (req, res) => {
  try {
    const { uuId } = req.params;
    if (!uuId) {
      throw new Error(ERROR_MESSAGE.MISSING_REQUIRED_FIELDS || "Plan ID is required.");
    }

    const plan = await planServices.getPlanById(uuId);

    sendSuccessResponse(res, SUCCESS_MESSAGE.PLAN_FETCHED_SUCCESSFULLY, plan, 200);
  } catch (error) {
    console.error("Error in getPlanById:", error.message);
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

//update plan by id
const updatePlanById = async (req, res) => {
  try {
    const { uuId } = req.params;
    const { planName, planTitle, planDescription, minimumInvestment } = req.body
    if (!uuId) {
      throw new Error(ERROR_MESSAGE.MISSING_REQUIRED_FIELDS || "Plan ID is required.");
    }
    
    const planData = {
      planName,
      planTitle,
      planDescription,
      minimumInvestment,
    };
    const updatedPlan = await planServices.updatePlanById(uuId, planData);

    sendSuccessResponse(res, SUCCESS_MESSAGE.PLAN_UPDATED_SUCCESSFULLY, updatedPlan, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

//delete plan by id


const deletePlanById = async (req, res) => {
  try {
    const { uuId } = req.params;
    if (!uuId) {
      throw new Error(ERROR_MESSAGE.MISSING_REQUIRED_FIELDS || "Plan ID is required.");
    }

    await planServices.deletePlanById(uuId);

    sendSuccessResponse(res, SUCCESS_MESSAGE.PLAN_DELETED_SUCCESSFULLY, null, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  deletePlanById,
  updatePlanById,
};
