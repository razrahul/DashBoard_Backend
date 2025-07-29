const express = require("express");
const leadsController = require("../controller/Lead");

const router = express.Router();

//post route for creating a lead
router.post("/", leadsController.createLeads);


//get All Leads by email or number by query
router.get("/search", leadsController.getAllLeadsByemailorNum);
//get route for fetching all leads
router.get("/", leadsController.getAllLeads);
//get route for fetching a lead by email and number
router.get("/:emailornum", leadsController.getLeadByEmail);



//put route for updating a lead by id
router.put("/:uuId", leadsController.updateLead);
//delete route for deleting a lead by id
router.delete("/:uuId", leadsController.deleteLead);


// staus update route for updating the status of a lead by id
router.put("/status/:uuId", leadsController.statusUpdateLead);

module.exports = router;