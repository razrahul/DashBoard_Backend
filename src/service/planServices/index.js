const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
} = require('../../utils/propertyResolver')

const {Op} = require('sequelize');
const Plan = require('../../models/Plan');

const createPlan = async (planData) => {
    try {
        const { planName } = planData;
        const existingPlan = await Plan.findOne({ where: { planName } });
        if (existingPlan) {
            throw new Error(ERROR_MESSAGE.PLAN_ALREADY_EXISTS || "Plan already exists");
        }
        const newplan = await Plan.create(planData);
        return newplan;
    } catch (error) {
        throw new Error(error.message || "Internal Server Error");

    }
};

//get All plans
const getAllPlans = async () => {
    try {
        const plans = await Plan.findAll();
        return plans;
    } catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};


// get plan by id
const getPlanById = async (id) => {
    try {    
        const plan = await Plan.findByPk(id);
        if (!plan) {
            throw new Error(ERROR_MESSAGE.PLAN_NOT_FOUND || "Plan not found");
        }
        return plan;
    } catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};


// upadte plan by id

const updatePlanById = async (id, planData) => {
    try {
        const plan = await Plan.findByPk(id);
        if (!plan) {
            throw new Error(ERROR_MESSAGE.PLAN_NOT_FOUND || "Plan not found");
        }
        const { planName, planTitle, planDescription, minimumInvestment } = planData;
        if(planName) plan.planName = planName.trim();
        if(planTitle) plan.planTitle = planTitle.trim();
        if(planDescription) plan.planDescription = planDescription.trim();
        if(minimumInvestment) plan.minimumInvestment = minimumInvestment.trim();
        // Check if the planName already exists for another plan
        const existingPlan = await Plan.findOne({
            where: {
                planName: planData.planName,
                uuId: { [Op.ne]: id } // Exclude the current plan
            }
        });
        if (existingPlan) {
            throw new Error(ERROR_MESSAGE.PLAN_ALREADY_EXISTS || "Plan with this name already exists");
        }
        await plan.save();
        return plan;
    } catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};

//delete plan by id
const deletePlanById = async (id) => {
    try {
        const plan = await Plan.findByPk(id);
        if (!plan) {
            throw new Error(ERROR_MESSAGE.PLAN_NOT_FOUND || "Plan not found");
        }
        await plan.destroy();
        return true;
    } catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};

module.exports = {
    createPlan,
    getAllPlans,
    getPlanById,
    deletePlanById,
    updatePlanById,
};