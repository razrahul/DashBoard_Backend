const express = require("express");
const TicketController = require("../controller/ticket");

const router = express.Router();

//create ticket
router.post("/", TicketController.createTicket);

//assign ticket
router.post("/:id", TicketController.assignTicket);

//get all tickets
router.get("/", TicketController.getAllTickets);

//get ticket by id
router.get("/:id", TicketController.getTicketById);

//update ticket
router.put("/:id", TicketController.updateTicket);

//delete ticket
router.delete("/:id", TicketController.deleteTicket);





module.exports = router;