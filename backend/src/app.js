const express = require("express");
const cors = require("cors");
const faqRoutes = require("./routes/faqRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

app.use(
  cors({
    origin: [
  "http://localhost:5173",
  "https://nmcn-faqs.vercel.app",
  "https://*.vercel.app",
],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "NMCN FAQ backend is running",
  });
});

app.use("/api/faqs", faqRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/tickets", ticketRoutes);

module.exports = app;