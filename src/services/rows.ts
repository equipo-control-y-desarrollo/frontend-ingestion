import { backend_api } from "../Utils";

export const addRow = async (query: string): Promise<any> => {
  try {
    const response = await backend_api.post(query);
    return response;
  } catch (error: any) {
    throw new Error(error.response.status, error.response.data);
  }
};

export const getRow = async (query: string): Promise<any> => {
  try {
    const response = await backend_api.get(query);
    return response;
  } catch (error: any) {
    throw new Error(error.response.status, error.response.data);
  }
};

export const deleteRow = async (query: string): Promise<any> => {
  try {
    const response = await backend_api.delete(query);
    return response;
  } catch (error: any) {
    throw new Error(error.response.status, error.response.data);
  }
};
