import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types/types";
import agent from "./agent";

export const authApi = {
  login: (data: LoginRequest) => agent.post<AuthResponse>("/Auth/login", data),
  register: (data: RegisterRequest) => agent.post("/Auth/register", data),
};
