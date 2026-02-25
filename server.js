import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

// CORS
app.use(cors({
  origin: ["https://www.quantumhorizon.it", "https://quantumhorizon.it"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.options("*", cors());

app.use(express.json());

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Health check
app.get("/", (req, res) => {
  res.send("OK");
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body || {};

    const messages = [
      {
        role: "system",
        content:
          "Sei Quantum Horizon Assistant. Rispondi in italiano in modo chiaro, professionale e semplice su quantum computing, formazione e lavoro."
      },
      ...(Array.isArray(history) ? history : []),
      { role: "user", content: message || "" }
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Non riesco a rispondere ora.";

    res.json({ reply });

  } catch (error) {
    console.error("Errore OpenAI:", error);
    res.status(500).json({ reply: "Errore server AI." });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
