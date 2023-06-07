import app from "./../app";
import request from "supertest";
import prisma from "./../utils/prisma";
import {
  createUser,
  createTrack,
  getImageData,
} from "../../test-fixtures/utils";

let apiAccessToken: string;
let trackId;
let imageData;

beforeAll(async () => {
  const { accessToken, userId } = await createUser();
  apiAccessToken = accessToken;
  trackId = (await createTrack(userId)).id;
  trackId = trackId;
  imageData = await getImageData();
});

afterAll(async () => {
  await prisma.$disconnect();
});

afterEach(async () => {
  await prisma.frame.deleteMany({});
});

test("Reject invalid body", async () => {
  const body = {
    image: undefined,
    start: 0,
    end: 1000,
    trackId,
  };
  await request(app)
    .post(`/api/track/${trackId}/frame`)
    .set("Authorization", "Bearer " + apiAccessToken)
    .send(body)
    .expect(400);
});

test("Create and save a frame in the database", async () => {
  const body = {
    image: imageData,
    start: 0,
    end: 1000,
  };
  const response = await request(app)
    .post(`/api/track/${trackId}/frame`)
    .set("Authorization", "Bearer " + apiAccessToken)
    .send(body);
  expect(response.status).toEqual(200);

  const image = await prisma.frame.findFirst();
  expect(image).not.toBeNull();
  expect(image.id).toEqual(response.body.id);
});
