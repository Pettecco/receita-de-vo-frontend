import api from "./api";

export const fetchUserById = async (id: string) => {
  const response = await api.get(`/user/id/${id}`);
  return response.data;
};

export const updateUserAvatar = async (
  id: string,
  avatarBase64: string,
  avatarMimeType: string
) => {
  return await api.patch(`/user/${id}/avatar`, {
    avatar: avatarBase64,
    mimeType: avatarMimeType,
  });
};

export const getProfilePic = async (username: string) => {
  try {
    const response = await api.get(`/user/${username}/avatar`);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};
