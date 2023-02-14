import { User } from "../interfaces";
import { backend_api } from "../Utils/util";

export const login = (username: string, password: string) => {
    return backend_api.post<User>("/auth/login", { username, password });
}