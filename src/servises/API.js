import axios from 'axios';

const API_KEY = `live_CqWfe3zoa8ucUnrhBYtcz5dvY7OOAPXZUD856Lf7C4SeVzy56bAO9ZrjP9ZeTA6C`;

axios.defaults.baseURL = ` https://api.thecatapi.com/v1`;
axios.defaults.headers.common['x-api-key'] = API_KEY;

const getImages = async (limit = 10) => {
  const res = await axios.get(`/images/search?limit=${limit}`);
  return res;
};

const getBreeds = async () => {
  const res = await axios.get('/breeds');
  return res;
};

const getBreedById = async (id, limit) => {
  const res = await axios.get(`/images/search?breeds_ids=${id}&limit=${limit}`);
  return res;
};

export const requests = {
  getImages,
  getBreeds,
  getBreedById,
};
