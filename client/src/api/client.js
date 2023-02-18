import axios from "axios";

const client = axios.create({
  baseURL: "http://192.168.248.159:5000/api",
});

export default client;
