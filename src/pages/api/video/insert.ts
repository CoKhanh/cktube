import { fetchMutation } from 'convex/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from "../../../../convex/_generated/api"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, url, description } = req.body;

    const video = await fetchMutation(api.videos.insert, { title, url, description })

    return res.status(200).json(video);
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}