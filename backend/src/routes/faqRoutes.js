const express = require("express");
const router = express.Router();

const {
  getAllFaqs,
  getPublishedFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} = require("../controllers/faqController");

router.get("/", getAllFaqs);
router.get("/public", getPublishedFaqs);
router.post("/", createFaq);
router.put("/:id", updateFaq);
router.delete("/:id", deleteFaq);

module.exports = router;