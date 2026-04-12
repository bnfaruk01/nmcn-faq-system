app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nmcn-faqs.vercel.app",
    ],
  })
);