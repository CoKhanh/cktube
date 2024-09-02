/**
 * @jest-environment node
 */

import { generateRandomString } from "../lib/utils";

const randomUsername = generateRandomString();

it("should return a user id and success message with status 200", async () => {
  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: randomUsername, password: "password" })
  });
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(data).toHaveProperty("message", "User registered successfully");
  expect(data).toHaveProperty("userId");
})

it("should return a user already exists message with status 400", async () => {
  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: randomUsername, password: "password" })
  });
  const data = await response.json();

  expect(response.status).toBe(400);
  expect(data).toHaveProperty("message", "User already exists");
})

it("should return method not allowed message with status 405", async () => {
  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  expect(response.status).toBe(405);
  expect(data).toHaveProperty("message", "Method Not Allowed");
})

it("should return token with status 200", async () => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: randomUsername, password: "password" })
  });
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(data).toHaveProperty("token");
  expect(data).toHaveProperty("message", "Login success");
})

it("should return Invalid username or password message with status 401 - wrong password", async () => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: randomUsername, password: "pwd" })
  });
  const data = await response.json();

  expect(response.status).toBe(401);
  expect(data).toHaveProperty("message", "Invalid username or password");
})

it("should return Invalid username or password message with status 401 - wrong username", async () => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: generateRandomString(), password: "password" })
  });
  const data = await response.json();

  expect(response.status).toBe(401);
  expect(data).toHaveProperty("message", "Invalid username or password");
})

it("should return method not allowed message with status 405", async () => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  expect(response.status).toBe(405);
  expect(data).toHaveProperty("message", "Method Not Allowed");
})
