export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    expires: number;
    refresh_token: string;
    access_token: string;
  }
} 