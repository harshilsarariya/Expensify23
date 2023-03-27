import axios from "axios";

const client = axios.create({
  baseURL: "http://192.168.2.104:5000/api",
});

export default client;
