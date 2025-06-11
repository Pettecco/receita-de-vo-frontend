import api from "./api";

export const fetchRecipes = async () => {
  const response = await api.get("/recipes");
  return response.data;
};

export const postComment = async (recipeId: string, text: string) => {
  return api.post(`/recipes/${recipeId}/comments`, { text });
};
