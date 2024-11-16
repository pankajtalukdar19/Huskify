export interface User {
  _id: string;
  role: RoleTyle;
  phoneNumber: string;
  name?: string;
  avatarUrl?: string;
  email?: string;
  points_available: number;
  points_redeemed: number;
  address: string;
}
export type RoleTyle = "user" | "vendor" | "admin";
export interface UserPayload {
  name: string;
  email: string;
  phoneNumber: string;
  role: RoleTyle;
  address?: string;
}

export interface UpdateParams {
  id: string;
  payload: UserPayload;
}
