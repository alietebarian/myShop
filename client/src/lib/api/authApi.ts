import type { LoginRequest } from "../types/types";
import agent from "./agent";


export const authApi = {
  login: (data: LoginRequest) => agent.post("/Auth/login", data)
};