export interface Coupon {
  _id: string;
  userId: string;
  vendorId: {
    _id: string;
    name: string;
    email: string;
  };
  code: string;
  coins: number;
  status: "generated" | "used" | "expired";
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CouponResponse {
  success: boolean;
  msg: string;
  data: Coupon[];
}
