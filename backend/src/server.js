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
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
    process.exit(1);
  }
}

startServer();