} catch (error) {
  const status = error?.status || error?.response?.status;
  const details = error?.response?.data || error?.message || error;
  console.error("Errore OpenAI status:", status);
  console.error("Errore OpenAI details:", details);
  res.status(500).json({ reply: "Errore server AI." });
}
