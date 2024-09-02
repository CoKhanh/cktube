import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { api } from "../../../../convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { User } from "./interface"

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const { username, password } = req.body;
  
      const userExists = await fetchQuery(api.users.find, { username });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser: User = {
        username,
        password: hashedPassword,
      };

      const userId = await fetchMutation(api.users.insert, newUser);

      return res.status(200).json({ message: "User registered successfully", userId });
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to register new user", message: error });
  }
}
