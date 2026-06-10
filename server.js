// Production server: serves the built Vite SPA from dist/
// and proxies chat requests to Anthropic so the API key never reaches the browser.

import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: "256kb" }));

const PORT = process.env.PORT || 3000;
const DIST = path.join(__dirname, "dist");

app.post("/api/anthropic", async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
  const { system, messages } = req.body || {};
  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6",
        max_tokens: 1024,
        system,
        messages,
      }),
    });
    const data = await upstream.json();
    const content = Array.isArray(data.content)
      ? data.content.map((c) => c.text).filter(Boolean).join("\n")
      : "";
    res.json({ content });
  } catch (e) {
    res.status(502).json({ error: String(e) });
  }
});

app.get("/healthz", (_req, res) => res.json({ ok: true }));

// Static assets + SPA fallback
app.use(express.static(DIST, { maxAge: "1y", immutable: true, index: false }));
app.use((_req, res) => res.sendFile(path.join(DIST, "index.html")));

app.listen(PORT, () => console.log(`nri-desk listening on :${PORT}`));
