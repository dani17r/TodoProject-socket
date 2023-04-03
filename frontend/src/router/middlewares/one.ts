import type { MiddlewareI } from "@interfaces/interfaces.generals";
import { socketBase } from "@services/main";

export const isRealId: MiddlewareI["function"] = (to, from, next) => {
  const socket = socketBase("/project");

  socket.emit("verify-id", to.params.id);
  socket.on("verify-id", (status: boolean) => {
    socket.close();
    to.meta.error = !status;
    if (status) return next();
    else return next();
  });
  socket.io.on("error", () => {
    to.meta.error = true;
    socket.close();
    return next();
  });
};
