import supabase from "./../src/utils/supabase";
import prisma from "./../src/utils/prisma";
import fs from "fs/promises";

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

export async function createTrack(userId: string, rawFrames: any[] = []) {
  const frames = rawFrames.map(({ imageData, ...frame }) => ({
    ...frame,
    imageUrl: `https://test-url.com/test.png`,
  }));
  const data = { userId, frames };
  return await prisma.track.create({ data });
}

export async function makeRawFrames(count: number) {
  const imageData = await getImageData();
  const frames = [...Array(count)].map(() => ({
    imageData,
    duration: 2,
  }));
  return frames;
}

export async function getImageData() {
  const data = await fs.readFile("./test-fixtures/test-image.png", {
    encoding: "base64",
  });
  return data;
}
