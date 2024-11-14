import { ApiResponse } from "../types/api.types";
import api from "./axios.config";

interface LoyaltyPoints {
  id: string;
  user: {
    id: string;
    name: string;
  };
  points: number;
  lastUpdated: string;
  status: string;
}

export const loyaltyApi = {
  getLoyaltyPoints: () => {
    return api.get<ApiResponse<LoyaltyPoints[]>>("/loyalty-points");
  },
};
