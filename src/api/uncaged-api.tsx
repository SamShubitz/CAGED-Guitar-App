import axios from "axios";
import { ProgressionType } from "../types";

export const api = axios.create({
  baseURL: "http://localhost:5108",
});

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const postUser = async (email: string) => {
  const newUser = { email: email };
  const response = await api.post("/users", newUser);
  return response.data;
};

export const getProgressionByTitle = async (title: string, id: number) => {
  const response = await api.get(`${id}/progressions?title=${title}`);
  return response.data;
};

export const getProgressionTitles = async (id: number) => {
  const response = await api.get(`${id}/progressions/titles`);
  return response.data;
};

export const postProgression = async (p: ProgressionType, userId: number) => {
  const response = await api.post(`${userId}/progressions`, p);
  return response.status;
};

export const putProgression = async (p: ProgressionType) => {
  const response = await api.put(`/progressions/`, p);
  return response.status;
};

export const deleteProgression = async (id: number) => {
  const response = await api.delete(`/progressions/${id}`);
  return response.status;
};
