export interface User {
  _id?: string;
  name: string;
  email: string;
  balance?: number;
  createdAt?: Date;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
