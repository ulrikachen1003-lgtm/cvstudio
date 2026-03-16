export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    anthropicKey: process.env.ANTHROPIC_API_KEY || '',
    jsonbinKey: process.env.JSONBIN_KEY || ''
  });
}
