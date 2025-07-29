const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
} = require("../../utils/propertyResolver");

const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../../utils/response");

const LeadsServices = require("../../service/leadsServices");  

const LeadsController = {
    createLeads: async (req, res) => {
        try {
            const { firstName, lastName, number, email, title } = req.body;

            if (!firstName || !lastName || !email) {
                throw new Error(ERROR_MESSAGE.FIRST_LAST_NAME_REQUIRED || "First and Last name are required.");
            }

            const newLead = await LeadsServices.createLead({ firstName, lastName, number, email, title });

            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.LEAD_CREATED_SUCCESSFULLY || "Lead created successfully.",
                newLead,
                201
            );
        } catch (error) {
            sendErrorResponse(
                res,
                ERROR_MESSAGE.SOMETHING_WENT_WRONG || error.message,
                error.message,
                500
            );
        }
    },

    getAllLeads: async (req, res) => {
        try {
            const leads = await LeadsServices.getAllLeads();
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.LEADS_FETCHED_SUCCESSFULLY || "Leads fetched successfully.",
                leads,
                200
            );
        } catch (error) {
            sendErrorResponse(
                res,
                ERROR_MESSAGE.SOMETHING_WENT_WRONG || error.message,
                error.message,
                500
            );
        }
    },

    getLeadByEmail: async (req, res) => {
        try {
            const { emailornum } = req.params;
            if (!emailornum) {
                throw new Error(ERROR_MESSAGE.EMAIL_REQUIRED || "Email is required.");
            }
            const lead = await LeadsServices.getLeadByEmail(emailornum);
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.LEAD_FETCHED_SUCCESSFULLY || "Lead fetched successfully.",
                lead,
                200
            );
        } catch (error) {
            sendErrorResponse(
                res,
                ERROR_MESSAGE.SOMETHING_WENT_WRONG || error.message,
                error.message,
                500
            );
        }
    },
    getAllLeadsByemailorNum: async (req, res) => {
        try {
            const { emailornum } = req.query;
            if (!emailornum || emailornum.length < 3) {
                throw new Error(ERROR_MESSAGE.EMAIL_OR_NUMBER_REQUIRED || "Minimum 3 characters are required for search.");
            }
            const leads = await LeadsServices.getLeadsByemailorNum(emailornum);
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.LEADS_FETCHED_SUCCESSFULLY || "Leads fetched successfully.",
                leads,
                200
            );
        } catch (error) {
            sendErrorResponse(
                res,
                ERROR_MESSAGE.SOMETHING_WENT_WRONG || error.message,
                error.message,
                500
            );
        }
    },

    updateLead: async (req, res) => {
        try {
            const { uuId } = req.params;
            const {firstName, lastName, number, email, title} = req.body;

            if (!uuId) {
                throw new Error(ERROR_MESSAGE.ID_REQUIRED || "ID is required.");
            }

            const updatedLead = await LeadsServices.updateLead(id, {
                firstName,
                lastName,
                number,
                email,
                title
            });
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.LEAD_UPDATED_SUCCESSFULLY || "Lead updated successfully.",
                updatedLead,
                200
            );
        } catch (error) {
            sendErrorResponse(
                res,
                ERROR_MESSAGE.SOMETHING_WENT_WRONG || error.message,
                error.message,
                500
            );
        }
    },

    deleteLead: async (req, res) => {
        try {
            const { uuId } = req.params;

            if (!uuId) {
                throw new Error(ERROR_MESSAGE.ID_REQUIRED || "ID is required.");
            }

            const response = await LeadsServices.deleteLead(uuId);
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.LEAD_DELETED_SUCCESSFULLY || "Lead deleted successfully.",
                response,
                200
            );
        } catch (error) {
            sendErrorResponse(
                res,
                ERROR_MESSAGE.SOMETHING_WENT_WRONG || error.message,
                error.message,
                500
            );
        }
    },

    statusUpdateLead: async (req, res) => {
        try {
            const { uuId } = req.params;
            const { status } = req.body;

            if (!uuId || !status) {
                throw new Error(ERROR_MESSAGE.ID_AND_STATUS_REQUIRED || "ID and status are required.");
            }

            const updatedLead = await LeadsServices.statusUpdateLead(uuId, status);
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.LEAD_STATUS_UPDATED_SUCCESSFULLY || "Lead status updated successfully.",
                updatedLead,
                200
            );
        } catch (error) {
            sendErrorResponse(
                res,
                ERROR_MESSAGE.SOMETHING_WENT_WRONG || error.message,
                error.message,
                500
            );
        }
    },

}

module.exports = LeadsController;