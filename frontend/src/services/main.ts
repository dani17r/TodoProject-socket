import { io } from "socket.io-client";

const socketUrlBase = import.meta.env.VITE_API_URL;
export const socketBase = (url: string, id?: string) => {
  return io(`${socketUrlBase}${url}`, {
    // return io(`${url}`, {
    extraHeaders: {
      user: id || "null",
    },
  });
};
