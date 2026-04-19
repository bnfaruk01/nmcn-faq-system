const express = require("express");
const router = express.Router();
const pool = require("../config/db");

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "am", "i", "you", "he", "she", "it", "we", "they",
  "how", "what", "when", "where", "why", "can", "could", "do", "does", "did",
  "to", "of", "for", "in", "on", "at", "my", "your", "our", "their", "be"
]);

function cleanText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getMeaningfulWords(text) {
  return cleanText(text)
    .split(" ")
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

function scoreMatch(userQuestion, faq) {
  const input = cleanText(userQuestion);
  const inputWords = getMeaningfulWords(userQuestion);

  const faqQuestion = cleanText(faq.question || "");
  const faqKeywords = cleanText(faq.keywords || "");
  const faqCombinedWords = new Set([
    ...getMeaningfulWords(faq.question || ""),
    ...getMeaningfulWords(faq.keywords || ""),
  ]);

  let score = 0;

  // Strong exact/phrase signals
  if (faqQuestion.includes(input) && input.length > 6) score += 8;
  if (input.includes(faqQuestion) && faqQuestion.length > 6) score += 6;

  // Keyword overlap
  let overlapCount = 0;
  inputWords.forEach((word) => {
    if (faqCombinedWords.has(word)) {
      overlapCount += 1;
    }
  });

  score += overlapCount * 2;

  // Bonus when at least 2 meaningful words overlap
  if (overlapCount >= 2) score += 2;

  // Small bonus for exact keyword phrase match
  if (faqKeywords && input.includes(faqKeywords)) score += 3;

  return {
    score,
    overlapCount,
  };
}

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        matched: false,
        message: "Please type your question.",
      });
    }

    const result = await pool.query(`
      SELECT * FROM nmcn_faqs
      WHERE status = 'Published'
    `);

    const faqs = result.rows;

    if (faqs.length === 0) {
      return res.json({
        matched: false,
        message: "There are no answers available yet.",
      });
    }

    let bestFaq = null;
    let bestScore = 0;
    let bestOverlap = 0;

    faqs.forEach((faq) => {
      const { score, overlapCount } = scoreMatch(question, faq);

      if (score > bestScore) {
        bestScore = score;
        bestOverlap = overlapCount;
        bestFaq = faq;
      }
    });

    // Require stronger evidence before returning a match
    if (!bestFaq || bestScore < 4 || bestOverlap < 1) {
      return res.json({
  matched: false,
  confidence: 0.2,
  message:
    "Sorry, I could not find an answer to that. You can send it to support for help.",
  escalate: true,
});
    }

    return res.json({
      matched: true,
      confidence: Number(Math.min(bestScore / 10, 0.99).toFixed(2)),
      answer: bestFaq.answer,
      question: bestFaq.question,
      category: bestFaq.category,
      sourceId: bestFaq.id,
    });
  } catch (error) {
    console.error("Chatbot error:", error);

    res.status(500).json({
      matched: false,
      message: "Something went wrong. Please try again.",
    });
  }
});

module.exports = router;