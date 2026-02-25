} catch (error) {
  const code = error?.code || error?.error?.code || error?.response?.data?.error?.code;
  const message = error?.response?.data?.error?.message || error?.message || "Errore";

  console.error("Errore OpenAI:", code, message);

  if (code === "insufficient_quota") {
    return res.status(200).json({
      reply: "Il bot AI è temporaneamente offline perché l’account OpenAI non ha quota/credito disponibile. Appena attivo il billing torna operativo."
    });
  }

  res.status(200).json({ reply: "Errore server AI. Riprova tra poco." });
}
