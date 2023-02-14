import { backend_api } from "../Utils/util";

export const getModule = (query: string) => {
    return backend_api.get(query)
}

export const downloadModule = (query: string) => {
    return backend_api
            .get(query, {
                responseType: "arraybuffer",
                headers: {
                    "Content-Disposition": "attachment; filename=export.xlsx",
                    "Content-Type":
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                },
            })
}