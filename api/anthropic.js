// Serverless proxy for Anthropic API. Deploy as a Vercel/Netlify function.
// The browser must NEVER see ANTHROPIC_API_KEY — keep it in server-only env.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
    return;
  }
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
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system,
        messages,
      }),
    });
    const data = await upstream.json();
    const content = Array.isArray(data.content)
      ? data.content.map((c) => c.text).filter(Boolean).join("\n")
      : "";
    res.status(200).json({ content });
  } catch (e) {
    res.status(502).json({ error: String(e) });
  }
}
