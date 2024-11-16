import { Task } from "@/types/task.types";
import api from "./axios.config";

export const taskApi = {
  getTask: () => api.get(`/task`),
 
};
