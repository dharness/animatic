import app from "./../app";
import request from "supertest";
import prisma from "./../utils/prisma";
import {
  createTrack,
  createUser,
  getImageData,
  makeRawFrames,
} from "../../test-fixtures/utils";
import { Prisma } from "@prisma/client";
import { deleteImageBulk, getAllImages } from "../utils/imageStorage";
import { saveFrames } from "./track";
import exp from "constants";

let accessToken: string;
let userId: string;
const countImages = async () => (await getAllImages()).length;

beforeAll(async () => {
  const user = await createUser();
  accessToken = user.accessToken;
  userId = user.userId;
});

afterAll(async () => {
  await prisma.$disconnect();

  // clear any existing images
  const imageUrls = await getAllImages();
  await deleteImageBulk(imageUrls);
});

beforeEach(async () => {
  // clear any existing tracks
  await prisma.track.deleteMany({});

  // clear any existing images
  const imageUrls = await getAllImages();
  await deleteImageBulk(imageUrls);
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

test("Get a track", async () => {
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

test("Update a track", async () => {
  const initialDuration = 2;
  const rawFrames = await makeRawFrames(5, initialDuration);
  const frames = await saveFrames(rawFrames);
  const { id } = await createTrack(userId, frames);

  // Confirm our images are saved
  expect(await countImages()).toEqual(5);

  const updatedDuration = 3;
  const updatedRawFrames = await makeRawFrames(3, updatedDuration);

  const body = { frames: updatedRawFrames };
  const response = await request(app)
    .put(`/api/track/${id}`)
    .set("Authorization", "Bearer " + accessToken)
    .send(body);

  expect(response.status).toEqual(200);
  const track = await prisma.track.findUnique({ where: { id } });
  expect(track.frames.length).toEqual(3);
  track.frames.forEach((frame: Prisma.JsonObject) =>
    expect(frame.duration).toEqual(updatedDuration)
  );

  // Confirm old images are deleted, and new images are saved
  expect(await countImages()).toEqual(3);
});
