import app from "./app";
import request from "supertest";
import supabase from "./utils/supabase";
import prisma from "./utils/prisma";
import fs from "fs/promises";
import path from "path";

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
  const response = await request(app).post("/image");
  expect(response.statusCode).toBe(401);
});

describe("/image", () => {
  let response;
  const body = {
    image: "image-data",
    id: 123,
    start: 0,
    end: 1000,
  };

  beforeAll(async () => {
    const data = await fs.readFile("./test-fixtures/test-image.png", {
      encoding: "base64",
    });
    body.image = data;
    response = await request(app)
      .post("/image")
      .set("Authorization", "Bearer " + apiAccessToken)
      .send(body);
  });

  test("protected route rejects requests with invalid body", async () => {
    const response = await request(app)
      .post("/image")
      .set("Authorization", "Bearer " + apiAccessToken)
      .send({ ...body, image: undefined });

    expect(response.statusCode).toBe(400);
  });

  test("protected route accepts authed requests", async () => {
    expect(response.statusCode).toBe(200);
  });

  test.only("protected route saves uploaded image in database", async () => {
    const image = await prisma.frame.findUnique({
      where: { id: body.id },
    });
    expect(image).not.toBeNull();
  });
});
