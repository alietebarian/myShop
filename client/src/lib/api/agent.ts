import axios, { type AxiosResponse, type AxiosRequestConfig } from "axios";
import { toast } from "sonner";

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

agent.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        toast.error("نشست شما منقضی شده است. لطفاً دوباره وارد شوید.");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

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
