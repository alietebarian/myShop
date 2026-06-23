export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  userId: string;
  email: string;
  fullName: string;
}

export interface LoginResponse {
  accessToken: string;
  userId: string;
  email: string;
  fullName: string;
}