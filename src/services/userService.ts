import api from "./api";

export const fetchUserById = async (id: string) => {
  const response = await api.get(`/user/id/${id}`);
  return response.data;
};
