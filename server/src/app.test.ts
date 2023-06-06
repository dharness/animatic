import app from "./app";
import request from "supertest";
import supabase from "./utils/supabase";
import prisma from "./utils/prisma";

let apiAccessToken: string;

beforeAll(async () => {
  const { data, error } = await supabase.auth.signUp({
    email: "example@email.com",
    password: "example-password",
  });
  apiAccessToken = data?.session?.access_token;
});

afterAll(async () => {
  await prisma.$disconnect();
});

test("health check route does not require token", async () => {
  const response = await request(app).get("/health");
  expect(response.statusCode).toBe(200);
});

test("protected route rejects un-authed reqs", async () => {
  const response = await request(app).get("/image");
  expect(response.statusCode).toBe(401);
});

test.only("protected route rejects un-authed reqs", async () => {
  const response = await request(app)
    .get("/image")
    .set("Authorization", "Bearer " + apiAccessToken)
    .expect(200);
});
