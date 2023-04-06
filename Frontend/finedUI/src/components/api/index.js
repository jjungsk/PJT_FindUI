import axios from "axios";

const BASE_URL = 'http://127.0.0.1:3000';

const getInstance = ()=>{
    axios.create({
        baseURL:BASE_URL
    })
};
