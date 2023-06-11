import supabase from "./../src/utils/supabase";
import prisma from "./../src/utils/prisma";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function createUser() {
  const { data, error } = await supabase.auth.signUp({
    email: `example.${Math.random()}@email.com`,
    password: "example-password",
  });

  if (error) throw error;
  return {
    accessToken: data?.session?.access_token,
    userId: data?.user?.id,
  };
}

export async function createTrack(userId: string, frames: any[] = []) {
  const data = { userId, frames };
  return await prisma.track.create({ data });
}

export async function makeRawFrames(count: number, duration = 2) {
  const imgData = await getimgData();
  const frames = [...Array(count)].map(() => ({
    id: uuidv4(),
    imgData,
    duration,
  }));
  return frames;
}

export async function getimgData() {
  const data = await fs.readFile("./test-fixtures/test-image.png", {
    encoding: "base64",
  });
  return data;
}
