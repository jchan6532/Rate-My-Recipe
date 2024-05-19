import axios from 'axios';

const baseUrl = process.env.REACT_APP_IS_DEV
  ? process.env.REACT_APP_BACKEND_URL_DEV
  : process.eventNames.REACT_APP_BACKEND_URL_PROD;

export const usersApi = axios.create({
  baseURL: `${baseUrl}/user`,
});
