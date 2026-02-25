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
