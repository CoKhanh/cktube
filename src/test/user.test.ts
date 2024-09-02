import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import register from "../pages/api/auth/register";
import login from "../pages/api/auth/login";
import { fetchQuery, fetchMutation } from "convex/nextjs";

// Mock the Convex API functions and bcrypt
jest.mock("convex/nextjs", () => ({
  fetchQuery: jest.fn(),
  fetchMutation: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
  hashSync: jest.fn(),
  compareSync: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

// Mock constants
jest.mock("../../constants", () => ({
  JWT_SECRET: "testsecretkey",
}));

const mockUser = {
  _id: "1",
  username: "testuser",
  password: "password123",
};

it("should register a new user successfully", async () => {
  // Mock fetchQuery to return null (user does not exist)
  (fetchQuery as jest.Mock).mockResolvedValue(null);
  // Mock bcrypt.hashSync to return a hashed password
  (bcrypt.hashSync as jest.Mock).mockReturnValue("hashedpassword123");
  // Mock fetchMutation to return a userId
  (fetchMutation as jest.Mock).mockResolvedValue("newUserId");

  // Create mock request and response objects
  const req = {
    method: "POST",
    body: mockUser,
  } as unknown as NextApiRequest;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  await register(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    message: "User registered successfully",
    userId: "newUserId",
  });
});

it("should return 400 if user already exists", async () => {
  // Mock fetchQuery to return a user (user already exists)
  (fetchQuery as jest.Mock).mockResolvedValue({ username: mockUser.username });

  // Create mock request and response objects
  const req = {
    method: "POST",
    body: mockUser,
  } as unknown as NextApiRequest;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  await register(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
});

it("should return 405 if method is not POST", async () => {
  // Create mock request and response objects with a method other than POST
  const req = {
    method: "GET",
  } as unknown as NextApiRequest;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  await register(req, res);

  expect(res.status).toHaveBeenCalledWith(405);
  expect(res.json).toHaveBeenCalledWith({ message: "Method Not Allowed" });
});

it("should return a 500 status and error message if fetchMutation fails", async () => {
  // Mock fetchQuery to return null (user does not exist)
  (fetchQuery as jest.Mock).mockResolvedValue(null);
  // Mock fetchMutation to throw an error
  (fetchMutation as jest.Mock).mockRejectedValue(new Error("Database error"));

  // Create mock request and response objects
  const req = {
    method: "POST",
    body: mockUser,
  } as unknown as NextApiRequest;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  await register(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({
    error: "Failed to register new user",
    message: expect.any(Error),
  });
});

it("should login successfully and return a JWT token", async () => {
  (fetchQuery as jest.Mock).mockResolvedValue(mockUser);
  (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
  (jwt.sign as jest.Mock).mockReturnValue("mockedToken");

  // Create mock request and response objects
  const req = {
    method: "POST",
    body: {
      username: mockUser.username,
      password: "password123",
    },
  } as unknown as NextApiRequest;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  await login(req, res);

  expect(jwt.sign).toHaveBeenCalledWith(
    { userId: mockUser._id, username: mockUser.username },
    "testsecretkey",
    { expiresIn: "1h" }
  );
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ token: "mockedToken", "message": "Login success" });
});

it("should return 401 if user is not found", async () => {
  (fetchQuery as jest.Mock).mockResolvedValue(null);

  // Create mock request and response objects
  const req = {
    method: "POST",
    body: {
      username: "nonexistentuser",
      password: "password123",
    },
  } as unknown as NextApiRequest;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  await login(req, res);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ message: "Invalid username or password" });
});

it("should return 401 if password is incorrect", async () => {
  (fetchQuery as jest.Mock).mockResolvedValue(mockUser);
  (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

  // Create mock request and response objects
  const req = {
    method: "POST",
    body: {
      username: mockUser.username,
      password: "wrongpassword", // Incorrect password for comparison
    },
  } as unknown as NextApiRequest;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  await login(req, res);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ message: "Invalid username or password" });
});

it("should return 405 if method is not POST", async () => {
  const req = {
    method: "GET",
  } as unknown as NextApiRequest;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  await login(req, res);

  expect(res.status).toHaveBeenCalledWith(405);
  expect(res.json).toHaveBeenCalledWith({ message: "Method Not Allowed" });
});

it("should return 500 if an error occurs during login", async () => {
  (fetchQuery as jest.Mock).mockRejectedValue(new Error("Database error"));

  const req = {
    method: "POST",
    body: {
      username: "user1",
      password: "password"
    },
  } as unknown as NextApiRequest;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  await login(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({
    error: "Failed to login",
    message: expect.any(Error),
  });
});
