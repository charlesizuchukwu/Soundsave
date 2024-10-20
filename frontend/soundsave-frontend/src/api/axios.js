import axios from "axios";

// const BASE_URL = "http://127.0.0.1:5000";

const BASE_URL = "https://soundsave-server.vercel.app";

const apiHeader = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export default axios.create({
  baseURL: BASE_URL,
  apiHeader,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    withCredentials: true,
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
});
