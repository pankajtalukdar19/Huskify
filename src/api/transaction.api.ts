import api from "./axios.config";
import { TransactionResponse } from "@/types/transaction.types";

export const transactionApi = {
  getUserTransactions: (userId: string) =>
    api.get<TransactionResponse>(`/transactions/user/${userId}`),
};
