import api from "./api";

export const likeRecipe = async (id: string) => {
  return api.post(`/recipes/${id}/like`);
};

export const unlikeRecipe = async (id: string) => {
  return api.delete(`/recipes/${id}/like`);
};

export const getLikeStatus = async (id: string) => {
  const res = await api.get(`/recipes/${id}/like/status`);
  return res.data.liked;
};

export const getLikeCount = async (id: string) => {
  const res = await api.get(`/recipes/${id}/like/count`);
  return res.data.count;
};
