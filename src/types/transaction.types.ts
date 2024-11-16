export interface Transaction {
  _id: string;
  userId: string;
  vendorId: {
    _id: string;
    name: string;
    email: string;
  };
  type: "earn" | "redeem" | "generate";
  points: number;
  couponId?: {
    _id: string;
    code: string;
  };
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionResponse {
  success: boolean;
  msg: string;
  data: Transaction[];
}
