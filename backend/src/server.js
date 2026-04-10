require("dotenv").config();
const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully");
    client.release();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:");
    console.error("message:", error.message);
    console.error("code:", error.code);
    console.error("detail:", error.detail);
    console.error("stack:", error.stack);
  }
}

startServer();