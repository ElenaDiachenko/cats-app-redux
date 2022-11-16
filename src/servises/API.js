import axios from 'axios';

const API_KEY = `live_CqWfe3zoa8ucUnrhBYtcz5dvY7OOAPXZUD856Lf7C4SeVzy56bAO9ZrjP9ZeTA6C`;

axios.defaults.baseURL = ` https://api.thecatapi.com/v1`;
axios.defaults.headers.common['x-api-key'] = API_KEY;

const getImageToVote = async () => {
  const res = await axios.get(`/images/search`);
  return res;
};

const addVote = async (vote) => {
  const res = await axios.post('/votes', vote);
  return res.data;
};

//api.thecatapi.com/v1/votes?sub_id=user-123/

const getVoteList = async (userId) => {
  const res = await axios.get(`/votes?sub_id=${userId}`);
  return res;
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

export const requests = {
  getImageToVote,
  addVote,
  getVoteList,
  getBreeds,
  getBreedById,
  getBreedDetails,
};
