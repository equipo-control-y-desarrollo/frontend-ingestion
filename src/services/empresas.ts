import { backend_api } from "../Utils/util";
import { Company } from "../interfaces";

export async function getEmpresas(): Promise<Company[]> {
  try {
    const response = await backend_api.get("empresas/user");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.status, error.response.data);
  }
}
