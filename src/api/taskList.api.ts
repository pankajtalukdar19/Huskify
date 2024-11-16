 
import api from "./axios.config";

export const taskApi = {
  getTask: () => api.get(`/task`),
  getTaskByVendorId : (id:string) => api.get(`/task/getbyvendorId` + id),
  getTaskById : (id:string) => api.get(`/task/` + id)
};
