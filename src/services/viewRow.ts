import { backend_api } from "../Utils/util";

export const getRow = (query : string) => {
    return backend_api.get(query)
}