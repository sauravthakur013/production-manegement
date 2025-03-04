import axios from "axios";
const BASE_URL = "http://localhost:5050";
import Cookies from "js-cookie";

const getToken = (): string | null => {
  if (!Cookies.get("token")) return null;
  return `Bearer ${Cookies.get("token")}`;
};

export const httpGet = async (url: string) => {
  const response = await axios.get(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  });
  return response;
};

export const httpPost = async (url: string, data: any) => {
  const response = await axios.post(`${BASE_URL}${url}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  });
  return response;
};
