import { WorkspaceResponse } from "@/interfaces/WorkspaceInterface";
import api from "./axiosInstance";

const readWorkspace = async (id_pessoa: number): Promise<WorkspaceResponse> => {
  try {
    const response = await api.get(`/pessoa/${id_pessoa}/workspace`);
    //   , {
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to ensure the function always returns or throws
  }
}

export default readWorkspace;