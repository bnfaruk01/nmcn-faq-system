const express = require("express");
const router = express.Router();

const {
  getAllTickets,
  getTicketById,
  replyToTicket,
  convertTicketToFaq,
} = require("../controllers/ticketController");

router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.put("/:id/reply", replyToTicket);
router.post("/:id/convert-to-faq", convertTicketToFaq);

module.exports = router;