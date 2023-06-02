import type { MiddlewareI } from "@interfaces/interfaces.generals";
import { projectStore } from "@stores/project";
import { socketBase } from "@services/main";
import { auth } from "@middlewares/auth";
import { userStore } from "@stores/user";
import { isEmpty } from "lodash";

export const isRealId: MiddlewareI["function"] = (to, from, next) => {
  const socket = socketBase("/project");
  const { insertOne } = projectStore();

  socket.emit("verify-id", to.params.id);
  socket.on("verify-id", ({ project, status }) => {
    socket.close();
    to.meta.error = !status;
    if (status) {
      insertOne(project);
      return next();
    } else return next();
  });
  socket.io.on("error", () => {
    to.meta.error = true;
    socket.close();
    return next();
  });
};

export const isShareProject: MiddlewareI["function"] = (to, from, next) => {
  const socket = socketBase("/project");
  const { insertOne } = projectStore();
  const { addUser } = userStore();

  auth(next, {
    actions: ({ user, isSession }) => {
      isSession && !isEmpty(user) && addUser(user);
    },
  });

  socket.emit("one", { _id: to.params.id });
  socket.on("one/success", (project) => {
    socket.close();

    if (project) {
      insertOne(project);
      const publicStatus = project.share.public.status ? "public" : "private";
      to.meta.type = publicStatus;
    }

    return next();
  });

  socket.on("one/error", () => {
    socket.close();
    to.meta.error = true;
    return next();
  });
};
