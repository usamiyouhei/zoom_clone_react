import axios from "axios";
import { addAuthorizationHeader } from "./interceptors.ts/request";

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL});
api.defaults.headers.common['content-type'] = 'application/json';
api.interceptors.request.use(addAuthorizationHeader)
export default api;