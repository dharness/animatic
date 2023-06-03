import axios from "axios";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const baseUrl = import.meta.env.VITE_ANIMATIC_API;

async function saveCanvas() {
  const { data, error } = await supabase.auth.getSession();
  const accessToken = data.session?.access_token;
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axios.get(`${baseUrl}/protected`, config);
}

export default { saveCanvas };
