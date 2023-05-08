import { User } from "../interfaces";
import { backend_api } from "../Utils";

export const login = async (
  username: string,
  password: string,
): Promise<any> => {
  const res = await backend_api.post<User>("/auth/login", {
    username,
    password,
  });
  return res.data;
};
