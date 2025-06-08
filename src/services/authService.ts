import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export function registerUser(data: { username: string; password: string }) {
  return axios.post(`${API_BASE_URL}/user/register`, data);
}

export function login(data: { username: string; password: string }) {
  return axios.post(`${API_BASE_URL}/auth/login`, data);
}
