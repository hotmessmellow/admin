import axios from "axios";

const getBaseUrl = () => {
  return process.env.NODE_ENV === "production"
    ? "https://edu-nft-demo-kn7k.onrender.com/api"
    : "http://localhost:8080/api";
};

export default axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-type": "application/json",
  },
});
