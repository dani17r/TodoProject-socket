import { io } from "socket.io-client";
import axios from "axios";

const socketUrlBase = import.meta.env.VITE_API_URL_WS;
const UrlBase = import.meta.env.VITE_API_URL;

export const socketBase = (url: string, meta?: object) => {
  console.log("se llama:", url);

  const socket = io(`${socketUrlBase}${url}`, {
    extraHeaders: { ...meta },
  });

  socket.compress(true);

  return socket;
};

export const api = axios.create({
  baseURL: UrlBase,
});
