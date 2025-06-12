/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const fetchRecipes = async () => {
  const response = await api.get("/recipes");
  return response.data;
};

export const postComment = async (recipeId: string, text: string) => {
  return api.post(`/recipes/${recipeId}/comments`, { text });
};

export const postRecipe = async (recipe: any) => {
  const response = await api.post("/recipes", recipe);
  return response.data;
};

export const deleteRecipe = async (recipeId: string) => {
  return api.delete(`/recipes/${recipeId}`);
};

export const incrementRecipeView = async (recipeId: string) => {
  return api.post(`/recipes/${recipeId}/view`);
};

export const getRecipeViews = async (recipeId: string) => {
  const response = await api.get(`/recipes/${recipeId}/views`);
  return response.data;
};
