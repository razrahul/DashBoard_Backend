const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
} = require("../../utils/propertyResolver");

const Leads = require("../../models/Leads");
const { Op } = require("sequelize");

const LeadsServices = {
    createLead: async ({ firstName, lastName, number, email, title}) => {
        try {
            if (!firstName || !lastName) {
                throw new Error(ERROR_MESSAGE.FIRST_LAST_NAME_REQUIRED || "First and Last name are required.");
            }
    
            const newLead = await Leads.create({
                firstName,
                lastName,
                number,
                email,
                title,
            });
    
            return newLead;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },
    
    getAllLeads: async () => {
        try {
            const leads = await Leads.findAll();
            return leads;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },

    getLeadByEmail: async (emailornum) => {
        try {
            const lead = await Leads.findOne({ 
                where: {
                    [Op.or]: [
                        { email: emailornum },
                        { number: emailornum }
                    ]
                }
            });
            if (!lead) throw new Error(ERROR_MESSAGE.LEAD_NOT_FOUND || "Lead not found");
            return lead;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getLeadsByemailorNum: async (emailornum) => {
        try {
            if (!emailornum || emailornum.length < 3) {
                throw new Error(ERROR_MESSAGE.EMAIL_OR_NUMBER_REQUIRED || "Minimum 3 characters are required for search.");
            }
            const leads = await Leads.findAll({
                where: {
                    [Op.or]: [
                        { email:{
                            [Op.like]: `%${emailornum}%`}, 
                        },
                        { number: {
                            [Op.like]: `%${emailornum}%`}, 
                        },
                    ],
                },
            });
            if (leads.length === 0) {
                throw new Error(ERROR_MESSAGE.LEAD_NOT_FOUND || "No leads found matching the criteria.");
            }
            return leads;
        }
        catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },

    updateLead: async (id, {firstName, lastName, number, email, title}) => {
        try {
            const lead = await Leads.findOne({ where: { uuId:id } });
            if (!lead) throw new Error(ERROR_MESSAGE.LEAD_NOT_FOUND || "Lead not found");

            lead.firstName = firstName;
            lead.lastName = lastName;
            lead.number = number;
            lead.email = email;
            lead.title = title;
            await lead.save();  

            return lead;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    deleteLead: async (id) => {
        try {
            const lead = await Leads.destroy({ where: { uuId:id } });
            if (!lead) throw new Error(ERROR_MESSAGE.LEAD_NOT_FOUND || "Lead not found");

            return { message: SUCCESS_MESSAGE.LEAD_DELETED_SUCCESSFULLY || "Lead deleted successfully." };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    statusUpdateLead: async (id, status) => {
        try {
            const lead = await Leads.findOne({ where: { uuId:id } });
            if (!lead) throw new Error(ERROR_MESSAGE.LEAD_NOT_FOUND || "Lead not found");

            lead.status = status;
            await lead.save();

            return lead;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
module.exports = LeadsServices;