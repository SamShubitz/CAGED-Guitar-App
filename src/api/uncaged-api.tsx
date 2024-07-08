import axios from "axios";
import { ProgressionType } from "../types";

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

export const getProgressionTitles = async () => {
  const response = await api.get(`/progressions/titles`);
  return response.data;
};

export const postProgression = async (p: ProgressionType) => {
  const response = await api.post("/progressions", p);
  return response.status;
};

export const putProgression = async (p: ProgressionType) => {
  const id = p.progressionId;
  const response = await api.put(`/progressions/${id}`, p);
  return response.status;
};

export const deleteProgression = async (id: number) => {
  const response = await api.delete(`/progressions/${id}`);
  return response.status;
};
