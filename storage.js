const JSONBIN_URL = 'https://api.jsonbin.io/v3/b';

export default async function handler(req, res) {
  const key = process.env.JSONBIN_KEY;
  if (!key) return res.status(500).json({ error: 'JSONBIN_KEY not configured' });

  const { method } = req;
  const { binId } = req.query;

  try {
    if (method === 'POST') {
      // Create new bin
      const r = await fetch(JSONBIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': key,
          'X-Bin-Name': 'CVStudio',
          'X-Bin-Private': 'true'
        },
        body: JSON.stringify(req.body)
      });
      const data = await r.json();
      res.status(200).json(data);

    } else if (method === 'PUT' && binId) {
      // Update existing bin
      const r = await fetch(`${JSONBIN_URL}/${binId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Master-Key': key },
        body: JSON.stringify(req.body)
      });
      const data = await r.json();
      res.status(200).json(data);

    } else if (method === 'GET' && binId) {
      // Load bin
      const r = await fetch(`${JSONBIN_URL}/${binId}/latest`, {
        headers: { 'X-Master-Key': key }
      });
      const data = await r.json();
      res.status(200).json(data);

    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
