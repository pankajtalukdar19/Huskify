import api from "./axios.config";
import { UserPayload, UpdateParams } from "../types/user.types";

export const userApi = {
  getUsers: () => {
    return api.get("/user");
  },

  addUsers: (payload: UserPayload) => {
    return api.post("/user", payload);
  },

  updateUsers: ({ id, payload }: UpdateParams) => {
    return api.put(`/user/${id}`, payload);
  },
};
