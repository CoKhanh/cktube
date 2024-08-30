// pages/api/auth/register.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

interface User {
  id: number;
  username: string;
  password: string;
}

// Simulated database (in-memory)
const users: User[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Check if the user already exists
    const userExists = users.find(user => user.username === username);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user and store in the "database"
    const newUser: User = {
      id: users.length + 1,
      username,
      password: hashedPassword,
    };
    users.push(newUser);

    return res.status(201).json({ message: 'User registered successfully' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
