export interface User {
  id: string;
  role: "user" | "customer" | "admin";
  phoneNumber: string;
  name?: string;
  avatarUrl?: string;
  email?: string;
  points_available:number
  points_redeemed:number
  address:string
}

export interface LoginRequest {
  phoneNumber: string;
}

export interface VerifyOtpRequest {
  phoneNumber: string;
  otp: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
