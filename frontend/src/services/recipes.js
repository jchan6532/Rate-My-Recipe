import axios from 'axios';

export const recipesApi = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/recipe`,
});
