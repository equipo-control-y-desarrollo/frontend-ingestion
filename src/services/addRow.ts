import { backend_api } from "../Utils/util";

export const addRow = (query : string) => {
    return backend_api.get(query);
}