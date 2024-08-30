import request from "supertest";
import { createMocks } from "node-mocks-http";
import registerHandler from "../src/pages/api/auth/register";
import loginHandler from "../src/pages/api/auth/login";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: "testuser",
        password: "testpassword",
      },
    });

    await registerHandler(req, res);

    expect(res.statusCode).toBe(201);
    expect(JSON.parse(res._getData())).toHaveProperty("message", "User registered successfully");
  });

  it("should log in an existing user", async () => {
    const registerReqRes = createMocks({
      method: "POST",
      body: {
        username: "testuser2",
        password: "testpassword",
      },
    });

    await registerHandler(registerReqRes.req, registerReqRes.res);

    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: "testuser2",
        password: "testpassword",
      },
    });

    await loginHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res._getData())).toHaveProperty("token");
  });

  it("should not log in with incorrect password", async () => {
    const registerReqRes = createMocks({
      method: "POST",
      body: {
        username: "testuser3",
        password: "testpassword",
      },
    });

    await registerHandler(registerReqRes.req, registerReqRes.res);

    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: "testuser3",
        password: "wrongpassword",
      },
    });

    await loginHandler(req, res);

    expect(res.statusCode).toBe(401);
    expect(JSON.parse(res._getData())).toHaveProperty("message", "Invalid username or password");
  });
});
