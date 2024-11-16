import { ApiResponse } from "@/types/api.types";
import api from "./axios.config"; 
import { User } from "@/types/user.types";

export const profileApi = {
  getProfile: async () => {
    return await api.get<ApiResponse<User>>("/profile");
  },

  updateProfile: async (formData: FormData) => {
    return await api.patch<ApiResponse<User>>("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
