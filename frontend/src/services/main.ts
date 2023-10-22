import { io } from "socket.io-client";
import axios from "axios";

const socketUrlBase = import.meta.env.VITE_API_URL_WS;
const UrlBase = import.meta.env.VITE_API_URL;
export const socketBase = (url: string, id?: string) => {
  return io(`${socketUrlBase}${url}`, {
    extraHeaders: {
      user: id ?? "null",
    },
  });
};

export const socketTask = (url: string, project_id: string) => {
  return io(`${socketUrlBase}${url}`, {
    extraHeaders: {
      project_id: project_id ?? "null",
    },
  });
};

export const api = axios.create({
  baseURL: UrlBase,
});
