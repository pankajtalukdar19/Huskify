import { RootState } from "@/store";
import { User } from "@/types/auth.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  phoneNumber: string | null;
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  phoneNumber: localStorage.getItem("phoneNumber"),
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
      localStorage.setItem("phoneNumber", action.payload);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", action.payload);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.phoneNumber = null;
      localStorage.clear();
    },
    updateUserPoints: (
      state,
      action: PayloadAction<{
        points_available: number;
        points_redeemed: number;
      }>
    ) => {
      if (state.user) {
        state.user.points_available = action.payload.points_available;
        state.user.points_redeemed = action.payload.points_redeemed;
        // Update localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const selectAccessToken = (state: RootState) => state.auth.token;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectUser = (state: RootState) => state.auth.user;

export const {
  setUser,
  updateUser,
  clearAuth,
  setPhoneNumber,
  setToken,
  setRefreshToken,
  updateUserPoints,
} = authSlice.actions;

export default authSlice.reducer;
