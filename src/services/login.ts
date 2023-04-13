import { User } from "../interfaces";
import { backend_api } from "../Utils/util";

export const login = async (
  username: string,
  password: string
): Promise<any> => {
  try {
    const res = await backend_api.post<User>("/auth/login", { username, password });
    return res.data;
  } catch (error: any) {
    throw error;  
  }
};
