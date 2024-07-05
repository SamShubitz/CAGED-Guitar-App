import axios from "axios";
import { ProgressionType } from "./types";

export const api = axios.create({
  baseURL: "http://localhost:5108",
});

export const getProgressions = async () => {
  const response = await api.get("/progressions");
  return response.data;
};

export const getProgressionByTitle = async (title: string) => {
  const response = await api.get(`/progressions?title=${title}`);
  return response.data;
};

export const postProgression = async (progression: ProgressionType) => {
  const response = await api.post("/progressions", progression);
  return response.status;
};

export const deleteProgression = async (progression: ProgressionType) => {
  const response = await api.delete(`/progressions${progression.title}`);
  return response.status;
};
