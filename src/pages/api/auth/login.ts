// pages/api/auth/login.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../../constants';

interface User {
  id: number;
  username: string;
  password: string;
}

// Simulated database (in-memory)
const users: User[] = [
  {
    id: 1,
    username: 'testuser',
    password: bcrypt.hashSync('password', 10),
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Find the user in the "database"
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create a JWT token
    const secretKey = JWT_SECRET;
    const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
