const express = require("express");
const router = express.Router();
const pool = require("../config/db");

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "am", "i", "you", "he", "she", "it", "we", "they",
  "how", "what", "when", "where", "why", "can", "could", "do", "does", "did",
  "to", "of", "for", "in", "on", "at", "my", "your", "our", "their", "be", "please"
]);

const TOPIC_SYNONYMS = {
  licensing: ["renew", "renewal", "licence", "license", "expiry", "expired", "penalty"],
  registration: ["register", "registration", "member", "enrol", "enrollment", "record"],
  portal: ["portal", "login", "log in", "password", "reset", "account", "sign in"],
  verification: ["verify", "verification", "certificate", "good standing", "standing"],
  support: ["help", "support", "contact", "reach", "problem", "issue", "confused"],
};

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

function containsAny(text, words) {
  const cleaned = cleanText(text);
  return words.some((word) => cleaned.includes(cleanText(word)));
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getConversationReply(question) {
  const q = cleanText(question);

  if (containsAny(q, ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"])) {
    return pickRandom([
      "Hello. I’m here to help with NMCN questions like licence renewal, registration, portal access, and verification.",
      "Hi there. I can help with NMCN questions about renewal, registration, verification, and portal access.",
      "Welcome. Ask me any NMCN question and I will do my best to help."
    ]);
  }

  if (containsAny(q, ["how are you", "how are you doing", "how is it going"])) {
    return pickRandom([
      "I’m doing well, thank you. I’m here to help with NMCN questions.",
      "I’m fine and ready to help. You can ask me about renewal, registration, portal access, or verification.",
      "I’m here and ready to help with your NMCN questions."
    ]);
  }

  if (containsAny(q, ["thank you", "thanks", "thank u"])) {
    return pickRandom([
      "You’re welcome. If you need more help, just ask.",
      "Glad to help. Feel free to ask another question.",
      "You’re welcome. I’m here if you need anything else."
    ]);
  }

  if (containsAny(q, ["bye", "goodbye", "see you"])) {
    return pickRandom([
      "Goodbye. Feel free to come back if you need help.",
      "Take care. I’m here whenever you need NMCN help.",
      "Alright. Come back anytime if you have another question."
    ]);
  }

  if (containsAny(q, ["i need help", "help me", "i am confused", "i’m confused", "i dont understand", "i don't understand"])) {
    return pickRandom([
      "No problem. Tell me what you need help with. I can help with renewal, registration, portal access, verification, and support questions.",
      "I’m here to help. Please tell me the exact issue so I can guide you better.",
      "That’s okay. Tell me what part you need help with, and I’ll guide you."
    ]);
  }

  return null;
}

function expandQuestion(question) {
  const q = cleanText(question);
  let expanded = q;

  Object.entries(TOPIC_SYNONYMS).forEach(([topic, synonyms]) => {
    if (synonyms.some((word) => q.includes(cleanText(word)))) {
      expanded += " " + synonyms.join(" ");
      expanded += " " + topic;
    }
  });

  return expanded;
}

function scoreMatch(userQuestion, faq) {
  const expandedInput = expandQuestion(userQuestion);
  const inputWords = getMeaningfulWords(expandedInput);

  const faqQuestion = cleanText(faq.question || "");
  const faqKeywords = cleanText(faq.keywords || "");
  const faqCategory = cleanText(faq.category || "");
  const faqCombinedWords = new Set([
    ...getMeaningfulWords(faq.question || ""),
    ...getMeaningfulWords(faq.keywords || ""),
    ...getMeaningfulWords(faq.category || ""),
  ]);

  let score = 0;

  if (faqQuestion.includes(cleanText(userQuestion)) && cleanText(userQuestion).length > 6) score += 8;
  if (cleanText(userQuestion).includes(faqQuestion) && faqQuestion.length > 6) score += 6;

  let overlapCount = 0;
  inputWords.forEach((word) => {
    if (faqCombinedWords.has(word)) overlapCount += 1;
  });

  score += overlapCount * 2;

  if (overlapCount >= 2) score += 3;
  if (faqKeywords && expandedInput.includes(faqKeywords)) score += 3;
  if (faqCategory && expandedInput.includes(faqCategory)) score += 2;

  return { score, overlapCount };
}

function buildHelpfulAnswer(faq) {
  const introOptions = [
    "Here’s what I found for you:",
    "This should help:",
    "You can do this:",
    "Here is the answer:",
  ];

  let answer = `${pickRandom(introOptions)}\n\n${faq.answer}`;

  if (faq.related_link_url) {
    answer += `\n\n${faq.related_link_label || "Open this link"}: ${faq.related_link_url}`;
  }

  return answer;
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

    // 1. Handle normal conversation first
    const conversationReply = getConversationReply(question);
    if (conversationReply) {
      return res.json({
        matched: true,
        confidence: 0.95,
        answer: conversationReply,
        source: "conversation",
      });
    }

    // 2. Search FAQs
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

    // 3. If good match found
    if (bestFaq && bestFaq.score >= 4 && bestFaq.overlapCount >= 1) {
      const answer = buildHelpfulAnswer(bestFaq);

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
    }

    // 4. Smarter free fallback
    const fallback = pickRandom([
      "I could not find a clear answer for that yet, but I have sent it to support so it can be reviewed.",
      "I’m not seeing a full answer for that right now. I have passed it to support for review.",
      "That one is not clear in the current FAQ yet. I have sent it to support so it can be checked.",
    ]);

    await logEscalation(question, "", fallback);

    return res.json({
      matched: false,
      confidence: 0.2,
      message: fallback,
      escalate: true,
      follow_up:
        "You can also ask me about licence renewal, registration, portal access, verification, or contact support.",
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