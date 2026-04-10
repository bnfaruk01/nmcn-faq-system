const pool = require("../config/db");

const getAllFaqs = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM nmcn_faqs
      ORDER BY created_at DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching FAQs:");
    console.error("message:", error.message);
    console.error("code:", error.code);
    console.error("detail:", error.detail);
    console.error("stack:", error.stack);

    res.status(500).json({
      error: "Failed to fetch FAQs",
      details: error.message,
      code: error.code || null,
    });
  }
};

const getPublishedFaqs = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM nmcn_faqs
      WHERE status = 'Published'
      ORDER BY created_at DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching published FAQs:");
    console.error("message:", error.message);
    console.error("code:", error.code);
    console.error("detail:", error.detail);
    console.error("stack:", error.stack);

    res.status(500).json({
      error: "Failed to fetch published FAQs",
      details: error.message,
      code: error.code || null,
    });
  }
};

const createFaq = async (req, res) => {
  try {
    const {
      question,
      answer,
      category,
      status,
      keywords,
      relatedLinkLabel,
      relatedLinkUrl,
      featured,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO nmcn_faqs
      (
        question,
        answer,
        category,
        status,
        keywords,
        related_link_label,
        related_link_url,
        featured
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [
        question,
        answer,
        category,
        status,
        keywords || "",
        relatedLinkLabel || "",
        relatedLinkUrl || "",
        featured || false,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating FAQ:", error.message);
    res.status(500).json({ error: "Failed to create FAQ" });
  }
};

const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      question,
      answer,
      category,
      status,
      keywords,
      relatedLinkLabel,
      relatedLinkUrl,
      featured,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE nmcn_faqs
      SET
        question = $1,
        answer = $2,
        category = $3,
        status = $4,
        keywords = $5,
        related_link_label = $6,
        related_link_url = $7,
        featured = $8,
        updated_at = NOW()
      WHERE id = $9
      RETURNING *
      `,
      [
        question,
        answer,
        category,
        status,
        keywords || "",
        relatedLinkLabel || "",
        relatedLinkUrl || "",
        featured || false,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "FAQ not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating FAQ:", error.message);
    res.status(500).json({ error: "Failed to update FAQ" });
  }
};

const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM nmcn_faqs
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "FAQ not found" });
    }

    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQ:", error.message);
    res.status(500).json({ error: "Failed to delete FAQ" });
  }
};

module.exports = {
  getAllFaqs,
  getPublishedFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
};