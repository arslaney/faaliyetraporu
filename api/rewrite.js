// Vercel Serverless Function — Anthropic'e güvenli köprü
// API anahtarı sunucuda kalır (ANTHROPIC_API_KEY ortam değişkeni)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Yalnızca POST' });

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(500).json({ error: 'ANTHROPIC_API_KEY tanımlı değil (Vercel → Settings → Environment Variables)' });

  const { system, prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'prompt eksik' });

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        system: system || '',
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const j = await r.json();
    if (!r.ok) return res.status(502).json({ error: (j.error && j.error.message) || 'Anthropic hatası' });
    const text = (j.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: 'Sunucu hatası: ' + e.message });
  }
}
