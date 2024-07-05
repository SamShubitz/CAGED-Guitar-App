import axios from "axios";
import { ProgressionType } from "./types";

export const api = axios.create({
  baseURL: "http://localhost:5108",
});

export const getProgressions = async () => {
  try {
    const response = await api.get("/progressions");
    return response.data;
  } catch (error) {
    console.error("Failed to get progressions", error);
  }
};

export const getProgressionByTitle = async (title: string) => {
  try {
    const response = await api.get(`/progressions?title=${title}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get progression", error);
  }
};

export const postProgression = async (progression: ProgressionType) => {
  try {
    const response = await api.post("/progressions", progression);
    return response.status;
  } catch (error) {
    console.error("Failed to add progression", error);
  }
};

export const deleteProgression = async (progression: ProgressionType) => {
  try {
    const response = await api.delete(`/progressions${progression.title}`);
    return response.status;
  } catch (error) {
    console.error("Failed to remove progression", error);
  }
};
