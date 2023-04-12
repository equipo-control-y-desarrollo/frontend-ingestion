import { User } from "../interfaces";
import { backend_api } from "../Utils/util";

export const login = async (
  username: string,
  password: string
): Promise<any> => {
  try {
    backend_api.post<User>("/auth/login", { username, password });
  } catch (error: any) {
    throw new Error(error.response.status, error.response.data);
  }
};
