import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import {
  setUser,
  setPhoneNumber,
  clearAuth,
  setToken,
  setRefreshToken,
} from "../features/auth/authSlice";
import type { LoginRequest, VerifyOtpRequest } from "../types/auth.types";

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestOtp = async ({ phoneNumber }: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      await authApi.requestOtp({ phoneNumber });
      dispatch(setPhoneNumber(phoneNumber));
      navigate("/verify-otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to request OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async ({ phoneNumber, otp }: VerifyOtpRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authApi.verifyOtp({ phoneNumber, otp });

      dispatch(setToken(response.data.data.accessToken));
      dispatch(setRefreshToken(response.data.data.refreshToken));
      dispatch(setUser(response.data.data.user));

      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  return {
    requestOtp,
    verifyOtp,
    logout,
    isLoading,
    error,
  };
}
