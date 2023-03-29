import axios from "axios";

const instance = axios.create({
  baseURL: "http://j8a108.p.ssafy.io",
  headers: {
    // "Content-type": "application/json;charset=UTF-8",
  },
});
export default instance;
