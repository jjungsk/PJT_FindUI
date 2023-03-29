import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.TEST_URL,
  headers: {
    // "Content-type": "application/json;charset=UTF-8",
  },
});

export default instance;
