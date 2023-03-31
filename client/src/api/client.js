import axios from "axios";

const client = axios.create({
  baseURL: "https://expensify-7psl.onrender.com/api",
});

export default client;
