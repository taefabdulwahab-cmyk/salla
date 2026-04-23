import axios from "axios";

const token = localStorage.getItem("user-token")?.replace(/"/g, "");

export const API = axios.create({
  baseURL: "https://dummyjson.com/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
