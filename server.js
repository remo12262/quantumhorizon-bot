import express from "express";
import cors from "cors";

const app = express();

// CORS: permette chiamate dal tuo sito
app.use(cors({
  origin: ["https://www.quantumhorizon.it", "https://quantumhorizon.it"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// Rispondi sempre alle preflight OPTIONS
app.options("*", cors());

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("OK");
});

// Chat endpoint
app.post("/api/chat", (req, res) => {
  const { message } = req.body || {};
  res.json({ reply: `Bot attivo (test): ${message || ""}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on port " + PORT));
