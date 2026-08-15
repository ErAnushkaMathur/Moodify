import axios from "axios";

const api = axios.create({
  baseURL: "https://moodify-2pi1.onrender.com",
  withCredentials: true,
});

export async function getSongByMood(mood) {
  const response = await api.get("/api/songs", { params: { mood } });
  return response.data.song;
}