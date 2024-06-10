import axios from "axios";

export const _axios = axios.create({
  baseURL: process.env.API_URL ?? "http://localhost:8000",
});
