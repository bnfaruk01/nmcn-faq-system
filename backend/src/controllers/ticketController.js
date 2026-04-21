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

module.exports = {
  getAllTickets,
  getTicketById,
  replyToTicket,
};