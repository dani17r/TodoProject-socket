import userLocalStorageComposable from "@composables/userLocalStorage";
import type { MiddlewareI } from "@interfaces/interfaces.generals";
import generalComposable from "@composables/general";
import socketServices from "@services/boot/sockets";
import { projectStore } from "@stores/project";
import { auth } from "@middlewares/auth";
import { userStore } from "@stores/user";
import { isEmpty } from "lodash";

const { setProjectId } = userLocalStorageComposable();
const { socketProject } = socketServices();
const { loading } = generalComposable();

export const isRealId: MiddlewareI["function"] = (to, from, next) => {
  const { insertOne } = projectStore();

  setProjectId(String(to.params.id));

  socketProject.value.emit("verify-id", to.params.id);
  socketProject.value.on("verify-id", ({ project, status }) => {
    to.meta.error = !status;
    if (status) {
      insertOne(project);
      return next();
    } else return next();
  });
  socketProject.value.on("error", () => {
    to.meta.error = true;
    socketProject.value.close();
    return next();
  });
};

export const isShareProject: MiddlewareI["function"] = (to, from, next) => {
  const { insertOne } = projectStore();
  loading.enable();

  setProjectId(String(to.params.id));
  
  auth(next, {
    actions: ({ user, isSession }) => {
      const { addUser } = userStore();
      isSession && !isEmpty(user) && addUser(user);
    },
    final: () => loading.disable(),
  });

  socketProject.value.emit("one", { _id: to.params.id });
  socketProject.value.on("one/success", (project) => {
    if (project) {
      insertOne(project);
      const publicStatus = project.share.public.status ? "public" : "private";
      to.meta.type = publicStatus;
    }

    return next();
  });

  socketProject.value.on("one/error", () => {
    socketProject.value.close();
    to.meta.error = true;
    return next();
  });
};
