import app from "./app";
import request from "supertest";
import supabase from "./supabase";
import prisma from "./prisma";

beforeAll(async () => {
  const { data, error } = await supabase.auth.signUp({
    email: "example@email.com",
    password: "example-password",
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

test("health check route does not require token", async () => {
  const response = await request(app).get("/health");
  expect(response.statusCode).toBe(200);
});

test("protected route rejects un-authed reqs", async () => {
  const response = await request(app).get("/protected");
  expect(response.statusCode).toBe(401);
});

test("protected route rejects un-authed reqs", async () => {
  const response = await request(app).get("/protected");
  expect(response.statusCode).toBe(401);
});
