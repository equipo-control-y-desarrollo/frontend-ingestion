import { backend_api } from "../Utils";

export const getModule = async (query: string) => {
  try {
    const response = await backend_api.get(query);
    return response;
  } catch (error: any) {
    throw new Error(error.response.status, error.response.data);
  }
};

export async function downloadModule(query: string): Promise<any> {
  const config: object = {
    responseType: "arraybuffer",
    headers: {
      "Content-Disposition": "attachment; filename=export.xlsx",
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  };

  try {
    const res = await backend_api.get(query, config);
    return res;
  } catch (err: any) {
    throw new Error(err.response.status, err.response.data);
  }
}
