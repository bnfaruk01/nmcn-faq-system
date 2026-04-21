const pool = require("../config/db");

const getAllTickets = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM support_tickets
      ORDER BY created_at DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM support_tickets
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
};

const replyToTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { admin_reply, status } = req.body;

    const result = await pool.query(
      `
      UPDATE support_tickets
      SET admin_reply = $1,
          status = $2,
          updated_at = NOW()
      WHERE id = $3
      RETURNING *
      `,
      [admin_reply || "", status || "Resolved", id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error replying to ticket:", error);
    res.status(500).json({ error: "Failed to update ticket" });
  }
};

const convertTicketToFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      category,
      status,
      featured,
      related_link_label,
      related_link_url,
      keywords,
    } = req.body;

    const ticketResult = await pool.query(
      `
      SELECT *
      FROM support_tickets
      WHERE id = $1
      `,
      [id]
    );

    if (ticketResult.rows.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    const ticket = ticketResult.rows[0];

    if (!ticket.admin_reply || !ticket.admin_reply.trim()) {
      return res.status(400).json({
        error: "Admin reply is required before converting to FAQ",
      });
    }

    const faqResult = await pool.query(
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
        ticket.user_question,
        ticket.admin_reply,
        category || "Support",
        status || "Draft",
        keywords || "",
        related_link_label || "",
        related_link_url || "",
        featured || false,
      ]
    );

    await pool.query(
      `
      UPDATE support_tickets
      SET status = 'Resolved',
          updated_at = NOW()
      WHERE id = $1
      `,
      [id]
    );

    res.status(201).json({
      message: "Ticket converted to FAQ successfully",
      faq: faqResult.rows[0],
    });
  } catch (error) {
    console.error("Error converting ticket to FAQ:", error);
    res.status(500).json({ error: "Failed to convert ticket to FAQ" });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  replyToTicket,
  convertTicketToFaq,
};