export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  try {
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);

    console.log("Body received:", JSON.stringify(body));
    console.log("API key starts with:", apiKey.substring(0, 10));

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log("Anthropic status:", response.status);
    console.log("Anthropic response:", JSON.stringify(data).substring(0, 200));
    return res.status(response.status).json(data);
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
