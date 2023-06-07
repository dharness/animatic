import app from "./../app";
import request from "supertest";
import supabase from "./../utils/supabase";
import prisma from "./../utils/prisma";
import fs from "fs/promises";
import path from "path";
import {
  getAccessToken,
  createTrack,
  getImageData,
} from "../../test-fixtures/utils";
import { func } from "joi";

let apiAccessToken: string;
let trackId;
let imageData;

beforeAll(async () => {
  apiAccessToken = await getAccessToken();
  trackId = (await createTrack()).id;
  trackId = trackId;
  imageData = await getImageData();
});

afterAll(async () => {
  await prisma.$disconnect();
});

afterEach(async () => {
  await prisma.frame.deleteMany({});
});

test("/frame route rejects requests with invalid body", async () => {
  const body = {
    image: undefined,
    start: 0,
    end: 1000,
    trackId,
  };
  const response = await request(app)
    .post("/frame")
    .set("Authorization", "Bearer " + apiAccessToken)
    .send(body)
    .expect(400);
});

test("/frame route accepts authed requests", async () => {
  const body = {
    image: imageData,
    start: 0,
    end: 1000,
    trackId,
  };
  const response = await request(app)
    .post("/frame")
    .set("Authorization", "Bearer " + apiAccessToken)
    .send(body)
    .expect(200);
});

test("/frame route saves uploaded image in database", async () => {
  const body = {
    image: imageData,
    start: 0,
    end: 1000,
    trackId,
  };
  const response = await request(app)
    .post("/frame")
    .set("Authorization", "Bearer " + apiAccessToken)
    .send(body)
    .expect(200);

  const image = await prisma.frame.findFirst();
  expect(image).not.toBeNull();
  expect(image.id).toEqual(response.body.id);
});
