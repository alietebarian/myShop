import axios, { type AxiosResponse, type AxiosRequestConfig } from "axios";

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export default {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    agent.get<T>(url, config).then(responseBody),

  post: <T>(url: string, body: object | FormData) =>
    agent.post<T>(url, body).then(responseBody),

  put: <T>(url: string, body: object | FormData) =>
    agent.put<T>(url, body).then(responseBody),

  patch: <T>(url: string, body?: object) =>
    agent.patch<T>(url, body).then(responseBody),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    agent.delete<T>(url, config).then(responseBody),
};
