import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("OK");
});

app.post("/api/chat", (req, res) => {
  res.json({ reply: "Bot attivo (test)" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://www.quantumhorizon.it");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});
