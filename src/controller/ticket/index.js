const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE
} = require("../../utils/propertyResolver");

const {
    sendErrorResponse,
    sendSuccessResponse
} = require("../../utils/response");

const TicketServices = require("../../service/ticketServices");

const TicketController = {
    createTicket: async (req, res) => {
        try {
            const { ticketSubject, assignedToUser, priority } = req.body;
            if (!ticketSubject ) {
                throw new Error(ERROR_MESSAGE.TICKET_SUBJECT || "Ticket subject is required.");
            }
            const newTicket = await TicketServices.createTicket({
                ticketSubject,
                assignedToUser,
                priority,
            });
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.TICKET_CREATED_SUCCESSFULLY || "Ticket created successfully.",
                newTicket,
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
    assignTicket: async (req, res) => {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            if (!id || !userId) {
                throw new Error(ERROR_MESSAGE.TICKET_FIELDS_REQUIRED || "All ticket fields are required.");
            }
            const assignedTicket = await TicketServices.assignTicket(id, userId);
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.TICKET_ASSIGNED_SUCCESSFULLY || "Ticket assigned successfully.",
                assignedTicket,
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
    getAllTickets: async (req, res) => {
        try {
            const tickets = await TicketServices.getAllTickets();
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.TICKETS_FETCHED_SUCCESSFULLY || "Tickets fetched successfully.",
                tickets,
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
    getTicketById: async (req, res) => {
        try {
            const { id } = req.params;
            const ticket = await TicketServices.getTicketById(id);
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.TICKET_FETCHED_SUCCESSFULLY || "Ticket fetched successfully.",
                ticket,
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
    updateTicket: async (req, res) => {
        try {
            const { id } = req.params;
            const { ticketSubject, assignedToUser, priority } = req.body;
            if (!id || !ticketSubject ) {
                throw new Error(ERROR_MESSAGE.TICKET_FIELDS_REQUIRED || "All ticket fields are required.");
            }
            const updatedTicket = await TicketServices.updateTicket(id, {
                ticketSubject,
                assignedToUser,
                priority,
            });
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.TICKET_UPDATED_SUCCESSFULLY || "Ticket updated successfully.",
                updatedTicket,
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
    deleteTicket: async (req, res) => {
        try {
            const { id } = req.params;
            const response = await TicketServices.deleteTicketById(id);
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.TICKET_DELETED || "Ticket deleted successfully.",
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
    

};

module.exports = TicketController;