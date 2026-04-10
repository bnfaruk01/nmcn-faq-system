const express = require("express");
const cors = require("cors");
const faqRoutes = require("./routes/faqRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "NMCN FAQ backend is running",
  });
});

app.use("/api/faqs", faqRoutes);

module.exports = app;