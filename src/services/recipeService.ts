import api from "./api";

export const fetchRecipes = async () => {
  const response = await api.get("/recipes");
  return response.data;
};
