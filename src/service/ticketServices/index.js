const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE
} = require("../../utils/propertyResolver");

const Ticket = require("../../models/Ticket");
const User = require("../../models/User");


const TicketServices = {
    createTicket: async ({ ticketSubject, assignedToUser, priority }) => {
        try {
            if (!ticketSubject ) {
                throw new Error(ERROR_MESSAGE.TICKET_FIELDS_REQUIRED || "All ticket fields are required.");
            }

            const newTicket = await Ticket.create({
                ticketSubject,
                assignedToUser,
                priority,
            });
            return newTicket;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },

    assignTicket: async (ticketId, userId) => {
        try {
            if (!ticketId || !userId) {
                throw new Error(ERROR_MESSAGE.TICKET_FIELDS_REQUIRED || "All ticket fields are required.");
            }

            const newTicket = await Ticket.findOne({ where: { uuId: ticketId } });
            if (!newTicket) throw new Error(ERROR_MESSAGE.TICKET_NOT_FOUND || "Ticket not found");
            newTicket.assignedToUser = userId;
            await newTicket.save();
            return newTicket;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },
    getAllTickets: async () => {
        try {
            const tickets = await Ticket.findAll(
                {
                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["id", "firstName", "lastName", "email", "number", "photo"],
                            // required: true,
                        }
                    ],
                    order: [["createdAt", "DESC"]],
                }
            ); // ⬅️ Sort by latest first
            return tickets;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },

    getTicketById: async (id) => {
        try {
            const ticket = await Ticket.findOne({ 
                where: { uuId:id },
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "firstName", "lastName", "email", "number", "photo"],
                        // required: true,
                    }
                ],
            });
            if (!ticket) throw new Error(ERROR_MESSAGE.TICKET_NOT_FOUND || "Ticket not found");
            return ticket;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    updateTicket: async (id, { ticketSubject, assignedToUser, priority }) => {
        try {
            const ticket = await Ticket.findOne({ where: { uuId: id } });
            if (!ticket) throw new Error(ERROR_MESSAGE.TICKET_NOT_FOUND || "Ticket not found");

            ticket.ticketSubject = ticketSubject || ticket.ticketSubject;
            ticket.assignedToUser = assignedToUser || ticket.assignedToUser;
            ticket.priority = priority || ticket.priority;

            await ticket.save();
            return ticket;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },

    deleteTicketById: async (id) => {
        try {
            const ticket = await Ticket.destroy({ where: { uuId: id } });
            if (!ticket) throw new Error(ERROR_MESSAGE.TICKET_NOT_FOUND || "Ticket not found");
            
            return { message: SUCCESS_MESSAGE.TICKET_DELETED || "Ticket deleted successfully" };
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },
};


module.exports = TicketServices;

