import app from "./../app";
import request from "supertest";
import prisma from "./../utils/prisma";
import { createUser } from "../../test-fixtures/utils";

let apiAccessToken: string;

beforeAll(async () => {
  const { accessToken } = await createUser();
  apiAccessToken = accessToken;
});

afterAll(async () => {
  await prisma.$disconnect();
});

test("Create a track", async () => {
  // clear any existing tracks
  await prisma.track.deleteMany({});

  const response = await request(app)
    .post("/api/track")
    .set("Authorization", "Bearer " + apiAccessToken)
    .expect(200);

  const track = await prisma.track.findFirst();
  expect(track).not.toBeNull();
  expect(track.id).toEqual(response.body.id);
});
