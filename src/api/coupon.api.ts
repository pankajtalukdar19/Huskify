import { CouponResponse } from "@/types/coupon.types";
import api from "./axios.config";

export const couponApi = {
  getUserCoupons: (userId: string) =>
    api.get<CouponResponse>(`/coupons/user/${userId}`),

  createCoupon: (data: { userId: string; vendorId: string; coins: number }) =>
    api.post("/coupons", data),
};
