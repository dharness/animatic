import axios from "axios";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const baseUrl = import.meta.env.VITE_ANIMATIC_API;

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

async function getAllTracks() {
  return axiosInstance.get(`${baseUrl}/track`);
}

async function createTrack() {
  const body = {
    frames: [
      {
        duration: 1,
        imgData: "",
      },
    ],
  };
  return axiosInstance.post(`${baseUrl}/track`, body);
}

export default { saveCanvas, getAllTracks, createTrack };
