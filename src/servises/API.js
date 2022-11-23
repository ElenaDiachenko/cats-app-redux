import axios from 'axios';

const API_KEY = `live_CqWfe3zoa8ucUnrhBYtcz5dvY7OOAPXZUD856Lf7C4SeVzy56bAO9ZrjP9ZeTA6C`;

axios.defaults.baseURL = ` https://api.thecatapi.com/v1`;
axios.defaults.headers.common['x-api-key'] = API_KEY;

const getImages = async (order, type, breedId, limit, page) => {
  const res = await axios.get(`/images/search`, {
    params: {
      limit,
      size: 'full',
      mime_types: type,
      breed_ids: breedId,
      order,
      page,
    },
  });
  return res;
};
const getImageToVote = async () => {
  const res = await axios.get(`/images/search`, {
    params: { limit: 1, size: 'full' },
  });
  return res;
};

const addVote = async (vote) => {
  const res = await axios.post('/votes', vote);
  return res.data;
};

const addFavourite = async (favourite) => {
  const res = await axios.post('/favourites', favourite);
  return res.data;
};

const removeFavourite = async (favouriteId) => {
  const res = await axios.delete(`/favourites/${favouriteId}`);
  return res;
};

const getFavourites = async (userId, limit = 10) => {
  const res = await axios.get(
    `/favourites?sub_id=${userId}&limit=${limit}&order=DESC`,
  );
  return res.data;
};

const getVoteList = async (userId) => {
  const res = await axios.get(`/votes?sub_id=${userId}&limit=10&order=DESC`);
  return res.data;
};

const getBreeds = async () => {
  const res = await axios.get('/breeds');
  return res;
};

const getBreedById = async (id, limit = 10) => {
  const res = await axios.get(`/images/search?limit=${limit}&breed_ids=${id}`);
  return res;
};

const getBreedDetails = async (id) => {
  const res = await axios.get(`/images/${id}`);
  return res;
};

const uploadImage = async (formData) => {
  const res = await axios.post(`/images/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

const getImageAnalsys = async (imageId) => {
  const res = await axios.post(`/images/${imageId}/analysis`);
  return res.data;
};

export const requests = {
  getImages,
  getImageToVote,
  addVote,
  addFavourite,
  getVoteList,
  getFavourites,
  removeFavourite,
  getBreeds,
  getBreedById,
  getBreedDetails,
  uploadImage,
  getImageAnalsys,
};
