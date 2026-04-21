const express = require("express");
const router = express.Router();
const pool = require("../config/db");

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "am", "i", "you", "he", "she", "it", "we", "they",
  "how", "what", "when", "where", "why", "can", "could", "do", "does", "did",
  "to", "of", "for", "in", "on", "at", "my", "your", "our", "their", "be", "please"
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
    ...getMeaningfulWords(faq.category || ""),
  ]);

  let score = 0;

  if (faqQuestion.includes(input) && input.length > 6) score += 8;
  if (input.includes(faqQuestion) && faqQuestion.length > 6) score += 6;

  let overlapCount = 0;
  inputWords.forEach((word) => {
    if (faqCombinedWords.has(word)) overlapCount += 1;
  });

  score += overlapCount * 2;
  if (overlapCount >= 2) score += 2;
  if (faqKeywords && input.includes(faqKeywords)) score += 3;

  return { score, overlapCount };
}

async function logEscalation(userQuestion, matchedFaqIds = "", responseText = "") {
  await pool.query(
    `
    INSERT INTO chatbot_logs (user_question, matched_faq_ids, ai_response, escalated)
    VALUES ($1, $2, $3, $4)
    `,
    [userQuestion, matchedFaqIds, responseText, true]
  );

  await pool.query(
    `
    INSERT INTO support_tickets (user_question, status)
    VALUES ($1, 'Open')
    `,
    [userQuestion]
  );
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

    const lowerQuestion = cleanText(question);

    const greetings = [
      "hello",
      "hi",
      "good morning",
      "good afternoon",
      "good evening",
      "how are you",
      "hey"
    ];

    if (greetings.includes(lowerQuestion)) {
      return res.json({
        matched: true,
        confidence: 0.95,
        answer:
          "Hello dear. I am here to help with NMCN questions like licence renewal, registration, portal access, verification or any NMCN related concern.",
        source: "greeting",
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

    const rankedFaqs = faqs
      .map((faq) => {
        const { score, overlapCount } = scoreMatch(question, faq);
        return { ...faq, score, overlapCount };
      })
      .sort((a, b) => b.score - a.score);

    const bestFaq = rankedFaqs[0];

    if (!bestFaq || bestFaq.score < 4 || bestFaq.overlapCount < 1) {
      const fallback =
        "Sorry, I could not find an answer to that yet. I will send it to support so an admin can help.";

      await logEscalation(question, "", fallback);

      return res.json({
        matched: false,
        confidence: 0.2,
        message: fallback,
        escalate: true,
      });
    }

    let answer = bestFaq.answer;

    if (bestFaq.related_link_url) {
      answer += `\n\n${bestFaq.related_link_label || "Open this link"}: ${bestFaq.related_link_url}`;
    }

    await pool.query(
      `
      INSERT INTO chatbot_logs (user_question, matched_faq_ids, ai_response, escalated)
      VALUES ($1, $2, $3, $4)
      `,
      [question, String(bestFaq.id), answer, false]
    );

    return res.json({
      matched: true,
      confidence: Number(Math.min(bestFaq.score / 10, 0.99).toFixed(2)),
      answer,
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