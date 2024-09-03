import { fetchMutation } from 'convex/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from "../../../../convex/_generated/api"


export default async function insert(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { title, url, description, publisher } = req.body;

      const video = await fetchMutation(api.videos.insert, { title, url, description, publisher });

      res.status(200).json({ video, message: "Shared new video successfully"});
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to insert video" });
  }
}