import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function getSongByMood(mood) {
  const response = await api.get("/api/songs", { params: { mood } });
  return response.data.song;
}