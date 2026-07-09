import type { LoginRequest, RegisterRequest } from "../types/types";
import agent from "./agent";


export const authApi = {
  login: (data: LoginRequest) => agent.post("/Auth/login", data),
  register: (data: RegisterRequest) => agent.post("/Auth/register", data)
};