import assert from "node:assert/strict";
import { test } from "node:test";
import request from "supertest";

process.env.JWT_SECRET = "test-secret-for-supertest-at-least-32-characters";
const { default: app } = await import("../src/app.js");

test("POST /api/auth/register crea el usuario y permite verificar su perfil", async () => {
  const newUser = {
    name: "Test User",
    email: `supertest-${Date.now()}@example.com`,
    password: "Supertest123!",
    age: 28,
  };

  const registration = await request(app)
    .post("/api/auth/register")
    .send(newUser)
    .expect(201);

  const expectedUser = {
    id: registration.body.id,
    name: newUser.name,
    email: newUser.email,
    age: newUser.age,
  };
  assert.deepEqual(registration.body, expectedUser);

  const login = await request(app)
    .post("/api/auth/login")
    .send({ email: newUser.email, password: newUser.password })
    .expect(200);

  assert.ok(login.body.accessToken);

  const user = await request(app)
    .get(`/api/users/${registration.body.id}`)
    .set("Authorization", `Bearer ${login.body.accessToken}`)
    .expect(200);

  assert.deepEqual(user.body, expectedUser);
});

test("GET /api/users rechaza peticiones sin token", async () => {
  const response = await request(app)
    .get("/api/users")
    .expect("Content-Type", /json/)
    .expect(401);

  assert.deepEqual(response.body, { error: "Unauthorized" });
});
