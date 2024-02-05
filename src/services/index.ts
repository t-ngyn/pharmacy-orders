import axios from 'axios';

export const createClient = (url) =>
  axios.create({
    baseURL: url,
  });
