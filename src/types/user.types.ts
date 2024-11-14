export interface UserPayload {
    name: string;
    email: string;
    phoneNumber: string;
    points_available: number;
    address: string;
    role: string;
  }
  
export interface UpdateParams {
    id: string;
    payload: UserPayload;
  }