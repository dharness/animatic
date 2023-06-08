import app from "./../app";
import request from "supertest";
import prisma from "./../utils/prisma";
import {
  createTrack,
  createUser,
  getImageData,
  makeRawFrames,
} from "../../test-fixtures/utils";

let accessToken: string;
let userId: string;
let imageData: string;

beforeAll(async () => {
  const user = await createUser();
  accessToken = user.accessToken;
  userId = user.userId;
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
    .set("Authorization", "Bearer " + accessToken)
    .expect(200);

  const track = await prisma.track.findFirst();
  expect(track).not.toBeNull();
  expect(track.id).toEqual(response.body.id);
});

test.only("Get a track", async () => {
  const rawFrames = await makeRawFrames(5);
  const { id } = await createTrack(userId, rawFrames);

  const response = await request(app)
    .get(`/api/track/${id}`)
    .set("Authorization", "Bearer " + accessToken);

  expect(response.status).toEqual(200);
  expect(response.body.id).toEqual(id);
  expect(response.body.frames.length).toEqual(5);
});

test("Create a track with frames", async () => {
  const frames = await makeRawFrames(5);
  const body = { frames };

  const response = await request(app)
    .post("/api/track")
    .set("Authorization", "Bearer " + accessToken)
    .send(body);

  expect(response.status).toEqual(200);
  const track = await prisma.track.findFirst();
  expect(track.frames.length).toEqual(5);
});
