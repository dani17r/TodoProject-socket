import type { CallbacksMiddlI } from "@interfaces/interfaces.user";
import type { MiddlewareI } from "@interfaces/interfaces.generals";
import generalComposable from "@composables/general";
import socketServices from "@services/boot/sockets";
import { userStore } from "@stores/user";
import { isEmpty } from "lodash";
import { ref } from "vue";

const dontCallback = ref(true);
const { loading } = generalComposable();
const { socketAuth } = socketServices();

loading.enable();

export const auth = (
  next: MiddlewareI["next"],
  { actions, error, final }: CallbacksMiddlI,
) => {
  if (dontCallback.value) {
    const token = localStorage.getItem("token") ?? null;
    dontCallback.value = false;

    socketAuth.value.emit("status", token);
    socketAuth.value.on("status/response", ({ user, isSession }) => {
      final && setTimeout(() => final(), 200);
      actions({ user, isSession });
    });
    socketAuth.value.io.on("error", () => {
      final && setTimeout(() => final(), 200);
      error && error();
      socketAuth.value.close();
    });
  } else {
    final && setTimeout(() => final(), 200);
    dontCallback.value = true;
    return next();
  }
};

export const isAuthLoginUser: MiddlewareI["function"] = (to, from, next) => {
  auth(next, {
    actions: ({ user, isSession }) => {
      if (isSession) {
        const { addUser } = userStore();
        if (!isEmpty(user)) addUser(user);
        return next();
      } else return next({ name: "login" });
    },
    error: () => next({ name: "login" }),
    final: () => loading.disable(),
  });
};

export const isNotAuthLoginUser: MiddlewareI["function"] = (to, from, next) => {
  auth(next, {
    actions: ({ user, isSession }) => {
      if (isSession) {
        const { addUser } = userStore();
        if (!isEmpty(user)) addUser(user);
        return next({ name: "home" });
      } else return next();
    },
    error: () => next(),
    final: () => loading.disable(),
  });
};
