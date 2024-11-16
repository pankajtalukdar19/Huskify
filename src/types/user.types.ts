export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: "user" | "vendor" | "admin";
  points_available: number;
  points_redeemed: number;
  address?: string;
}
export interface UserPayload {
  name: string;
  email: string;
  phoneNumber: string;
  role: "user" | "vendor" | "admin";
  address?: string;
}

export interface UpdateParams {
  id: string;
  payload: UserPayload;
}
