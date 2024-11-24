import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Call your backend API
      const response = await fetch('http://localhost:8080/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json({ success: true, message: 'Login successful', data });
      } else {
        const error = await response.json();
        return res.status(401).json({ success: false, message: error.message || 'Invalid credentials' });
      }
    } catch (error) {
        if(error){
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
      
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
