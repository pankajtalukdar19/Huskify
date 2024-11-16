import { UserPayload } from "@/types/user.types";
import api from "./axios.config";

interface UpdateParams {
  id: string;
  payload: Partial<UserPayload>;
}

export const userApi = {
  getUsers: () => api.get("/user"),
  getUserById: (id: string) => api.get(`/user/${id}`),
  addUsers: (payload: UserPayload) => api.post("/user", payload),
  updateUsers: ({ id, payload }: UpdateParams) =>
    api.put(`/user/${id}`, payload),
};
