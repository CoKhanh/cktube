import type { NextApiRequest, NextApiResponse } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  const tasks = await fetchQuery(api.tasks.get);
  res.status(200).json({ tasks });
};
