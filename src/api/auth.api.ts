import api from "./axios.config";
import type {
  LoginRequest,
  VerifyOtpRequest,
  AuthResponse,
  RefreshTokenResponse,
} from "../types/auth.types";
import type { ApiResponse } from "../types/api.types";

export const authApi = {
  requestOtp: async (data: LoginRequest) => {
    return await api.post<ApiResponse<{ message: string }>>(
      "auth/request-otp",
      data
    );
  },

  verifyOtp: async (data: VerifyOtpRequest) => {
    return await api.post<ApiResponse<AuthResponse>>("auth/verify-otp", data);
  },

  refreshToken: async (refreshToken: string) => {
    return await api.post<ApiResponse<RefreshTokenResponse>>("auth/refresh", {
      refreshToken,
    });
  },
};
