const express = require("express");
const router = express.Router();

const {
  getAllTickets,
  getTicketById,
  replyToTicket,
} = require("../controllers/ticketController");

router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.put("/:id/reply", replyToTicket);

module.exports = router;