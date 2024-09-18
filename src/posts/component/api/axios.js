import axios from "axios";

const api = axios.create({
    //spring server url
    baseURL: "http://localhost:7777",
})

export default api;