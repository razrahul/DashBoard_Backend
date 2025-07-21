const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
} = require('../../utils/propertyResolver');

const userPlan = require('../../models/UserPlan');
const User = require('../../models/User');
const Plan = require('../../models/Plan');

const userPlanService = {
    createUserPlan: async (memberId, planId) => {
        try {
            if (!memberId || !planId) {
                throw new Error(ERROR_MESSAGE.MISSING_REQUIRED_FIELDS || "Member ID and Plan ID are required.");
            }
            const newUserPlan = new userPlan({
                memberId: memberId,
                planId: planId,
            });
            await newUserPlan.save();
            return newUserPlan;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },


    getAllUserPlans: async () => {
        try {
            const userPlans = await userPlan.findAll(
                {
                    include: [
                        {
                            model: User, // Assuming User is the name of the user model
                            as: 'user', // Alias if defined in associations
                            attributes: ['id', 'firstName', 'lastName', 'number', 'email', 'creditScore', 'currentBalance', 'memberId'] // Adjust attributes as needed
                        },
                        {
                            model: Plan, // Assuming Plan is the name of the plan model
                            as: 'plan', // Alias if defined in associations
                            attributes: ['id', 'uuId', 'planName', 'planTitle', 'planDescription', 'minimumInvestment'] // Adjust attributes as needed
                        }
                    ]
                }
            );
            return userPlans;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },

    getUserPlanById : async (id) => {
        try {
            const userPlanData = await userPlan.findByPk({
                where: { uuId: id },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'firstName', 'lastName', 'number', 'email', 'creditScore', 'currentBalance', 'memberId', ]
                    },
                    {
                        model: Plan,
                        as: 'plan',
                        attributes: ['id', 'uuId', 'planName', 'planTitle', 'planDescription', 'minimumInvestment']
                    }
                ]
            });
            if (!userPlanData) {
                throw new Error(ERROR_MESSAGE.USER_PLAN_NOT_FOUND || "User Plan not found");
            }
            return userPlanData;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },

    getUserPlanBymemberId : async (memberId) => {
        try {
            const userPlanData = await userPlan.findOne(
                {
                    where: { memberId: memberId },
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'firstName', 'lastName', 'number', 'email', 'creditScore', 'currentBalance', 'memberId', ]
                        },
                        {
                            model: Plan,
                            as: 'plan',
                            attributes: ['id', 'uuId', 'planName', 'planTitle', 'planDescription', 'minimumInvestment']
                        }
                    ]
                }
            );
            if (!userPlanData) {
                throw new Error(ERROR_MESSAGE.USER_PLAN_NOT_FOUND || "User Plan not found");
            }
            return userPlanData;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },

    deleteUserPlanById : async (id) => {
        try {
            const userPlanData = await userPlan.findByPk(id);
            if (!userPlanData) {
                throw new Error(ERROR_MESSAGE.USER_PLAN_NOT_FOUND || "User Plan not found");
            }
            await userPlanData.destroy();
            return SUCCESS_MESSAGE.USER_PLAN_DELETED || "User Plan deleted successfully";
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },

    updateUserPlanById : async (id, updateData) => {
        try {
            const { memberId, planId } = updateData;
            const userPlanData = await userPlan.findByPk(id);
            if (!userPlanData) {
                throw new Error(ERROR_MESSAGE.USER_PLAN_NOT_FOUND || "User Plan not found");
            }
            await userPlanData.update({ memberId, planId });
            return userPlanData;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    }
};

module.exports = userPlanService;