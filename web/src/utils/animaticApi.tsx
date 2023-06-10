import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const baseUrl = import.meta.env.VITE_ANIMATIC_API;
export interface RawFrame {
  imgData: string;
  duration: number;
}

let axiosInstance = axios.create();
axiosInstance.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const accessToken = data.session?.access_token;
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

async function saveCanvas() {
  return axiosInstance.get(`${baseUrl}/protected`);
}

async function getTracks() {
  const { data } = await axiosInstance.get(`${baseUrl}/track`);

  // Add id to each frame, since this is not stored in the database yet
  for (let track of data) {
    track.frames = track.frames.map((frame: any) => ({
      ...frame,
      id: uuidv4(),
    }));
  }
  return data;
}

async function createTrack(frames: RawFrame[]) {
  const body = { frames };
  const { data: track } = await axiosInstance.post(`${baseUrl}/track`, body);
  return track;
}

async function updateTrack(trackId: string, frames: RawFrame[]) {
  if (!trackId) return createTrack(frames);

  const body = { frames };
  const { data: track } = await axiosInstance.post(
    `${baseUrl}/track/${trackId}`,
    body
  );
  return track;
}

export default { saveCanvas, getTracks, createTrack, updateTrack };
