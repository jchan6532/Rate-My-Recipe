import axios from 'axios';

const baseUrl =
  process.env.REACT_APP_IS_DEV === 'true'
    ? process.env.REACT_APP_BACKEND_URL_DEV
    : process.env.REACT_APP_BACKEND_URL_PROD;

export const recipesApi = axios.create({
  baseURL: `${baseUrl}/recipe`,
});
