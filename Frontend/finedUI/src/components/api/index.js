import axios from 'axios';

// const BASE_URL = 'http://127.0.0.1:3000';
const BASE_URL = 'http://127.0.0.1:8080';

const getInstance = () => {
  axios.create({
    baseURL: BASE_URL,
  });
};
