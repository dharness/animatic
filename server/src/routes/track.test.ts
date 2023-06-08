import app from "./../app";
import request from "supertest";
import prisma from "./../utils/prisma";
import { createUser, getImageData } from "../../test-fixtures/utils";

let apiAccessToken: string;
let imageData: string;

beforeAll(async () => {
  const { accessToken } = await createUser();
  apiAccessToken = accessToken;
  imageData = await getImageData();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  // clear any existing tracks
  await prisma.track.deleteMany({});
});

test("Create empty track", async () => {
  const response = await request(app)
    .post("/api/track")
    .set("Authorization", "Bearer " + apiAccessToken)
    .expect(200);

  const track = await prisma.track.findFirst();
  expect(track).not.toBeNull();
  expect(track.id).toEqual(response.body.id);
});

test("Create a track with frames", async () => {
  const frames = [...Array(5)].map(() => ({
    imageData,
    duration: 2,
  }));

  const body = { frames };
  const response = await request(app)
    .post("/api/track")
    .set("Authorization", "Bearer " + apiAccessToken)
    .send(body);

  expect(response.status).toEqual(200);
  const track = await prisma.track.findFirst();
  expect(track.frames.length).toEqual(5);
});
