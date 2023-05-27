import axios from "axios"

const baseUrl = import.meta.env.VITE_ANIMATIC_API;

async function saveCanvas() {
    return axios.get(`${baseUrl}`);
}

export default { saveCanvas };