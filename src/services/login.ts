import { backend_api } from "../Utils/util";

export const login = (username: string, password: string) => {
    console.log("email: ", username);
    console.log("password: ", password);
    return backend_api.post("/auth/login", { username, password });
}