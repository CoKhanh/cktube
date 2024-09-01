import type { NextApiRequest, NextApiResponse } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

export default async function allVideos(
  _: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const videos = await fetchQuery(api.videos.get);
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};
