import type { CallbacksMiddlI } from "@interfaces/interfaces.user";
import type { MiddlewareI } from "@interfaces/interfaces.generals";
import { socketBase } from "@services/main";
import { userStore } from "@stores/user";
import { isEmpty } from "lodash";
import { ref } from "vue";

const dontCallback = ref(true);

export const auth = (
  next: MiddlewareI["next"],
  { actions, error }: CallbacksMiddlI,
) => {
  const socket = socketBase("/auth");

  if (dontCallback.value) {
    const token = localStorage.getItem("token") ?? null;
    dontCallback.value = false;

    socket.emit("status", token);
    socket.on("status/response", ({ user, isSession }) => {
      actions({ user, isSession });
      socket.close();
    });
    socket.io.on("error", () => {
      error && error();
      socket.close();
    });
  } else {
    dontCallback.value = true;
    socket.close();
    next();
  }
};

export const isAuthLoginUser: MiddlewareI["function"] = (to, from, next) => {
  const { addUser } = userStore();

  auth(next, {
    actions: ({ user, isSession }) => {
      if (isSession) {
        if (!isEmpty(user)) addUser(user);
        return next();
      } else return next({ name: "login" });
    },
    error: () => {
      return next({ name: "login" });
    },
  });
};

export const isNotAuthLoginUser: MiddlewareI["function"] = (to, from, next) => {
  const { addUser } = userStore();

  auth(next, {
    actions: ({ user, isSession }) => {
      if (isSession) {
        if (!isEmpty(user)) addUser(user);
        return next({ name: "home" });
      } else return next();
    },
    error: () => {
      return next();
    },
  });
};
