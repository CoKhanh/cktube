// pages/api/auth/login.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../../constants';
import { User } from './interface';
import { fetchQuery } from 'convex/nextjs';
import { api } from "../../../../convex/_generated/api";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const { username, password } = req.body;
  
      // Find the user in the "database"
      const user = await fetchQuery(api.users.find, { username }) as User;
  
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Compare the provided password with the hashed password
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Create a JWT token
      const secretKey = JWT_SECRET;
      const token = jwt.sign({ userId: user._id, username: user.username }, secretKey, {
        expiresIn: '1h',
      });
  
      return res.status(200).json({ token });
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to login", message: error });
  }
}
