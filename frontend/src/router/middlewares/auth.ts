import type { CallbacksMiddlI } from "@interfaces/interfaces.user";
import type { MiddlewareI } from "@interfaces/interfaces.generals";
import generalComposable from "@composables/general";
import { socketBase } from "@services/main";
import { userStore } from "@stores/user";
import { isEmpty } from "lodash";
import { ref } from "vue";

const dontCallback = ref(true);

const { loading } = generalComposable();

loading.enable();

export const auth = (
  next: MiddlewareI["next"],
  { actions, error, final }: CallbacksMiddlI,
) => {
  const socket = socketBase("/auth");

  if (dontCallback.value) {
    const token = localStorage.getItem("token") ?? null;
    dontCallback.value = false;

    socket.emit("status", token);
    socket.on("status/response", ({ user, isSession }) => {
      final && setTimeout(() => final(), 300);
      actions({ user, isSession });
      socket.close();
    });
    socket.io.on("error", () => {
      final && setTimeout(() => final(), 300);
      error && error();
      socket.close();
    });
  } else {
    final && setTimeout(() => final(), 400);
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
    final: () => loading.disable(),
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
    final: () => loading.disable(),
  });
};
