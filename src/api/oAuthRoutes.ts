import api from "./axiosInstance";

const sendJWTTOken = async (token: string) => {
  try {
    const response = await api.post("/auth/callback", { token });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// const getJWTToken = async (token: string) => {
//   try {
//     const response = await api.get("/auth/callback", { params: { token } });
//     return response.data;
//   }
//   catch (error) {
//     console.error(error);
//   }
// }

export { sendJWTTOken };