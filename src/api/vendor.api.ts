import { ApiResponse } from "../types/api.types";
import api from "./axios.config";

interface Vendor {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
}

export const vendorApi = {
  getVendors: () => {
    return api.get<ApiResponse<Vendor[]>>("/vendors");
  },

  getVendorByAddress: (id: string) => {
    return api.get("/user/getvendorByAddress/" + id);
  }
};
