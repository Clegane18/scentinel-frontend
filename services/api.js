import axios from "axios";
import { BASE_URL } from "../constants/config";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 5000,
});

export default api;
