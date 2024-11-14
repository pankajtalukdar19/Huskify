import { ApiResponse } from "../types/api.types";
import api from "./axios.config";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: string;
  status: "completed" | "pending" | "failed";
}

export const transactionApi = {
  getTransactions: () => {
    return api.get<ApiResponse<Transaction[]>>("/transactions");
  },
};
