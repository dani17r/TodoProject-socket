import type { NotifyErrorI, NotifyI } from "@interfaces/interfaces.generals";
import userLocalStorageComposable from "@composables/userLocalStorage";
import useProjectStore from "@stores/project";
import { socketBase } from "@services/main";
import { defineStore } from "pinia";
import { isEmpty } from "lodash";
import type {
  CallbacksI,
  FormsI,
  LoginI,
  StateI,
  UserI,
} from "@interfaces/interfaces.user";

const { removeUserId, setUserId } = userLocalStorageComposable();

export default defineStore("user", {
  state: (): StateI => ({
    current: null,
    lifecicles: {
      mounted: false,
    },
  }),
  getters: {
    isLogin: (store) => store.current == null,
  },
  actions: {
    clear() {
      this.lifecicles.mounted = false;
      this.current = null;
    },

    addUser(newUser: UserI) {
      if (!this.lifecicles.mounted)
        !isEmpty(newUser) && (this.current = newUser);
    },

    login(form: FormsI["login"], callbacks: CallbacksI) {
      const socket = socketBase("/auth");
      socket.emit("login", form);

      socket.on("login/success", ({ user, token, notify }: LoginI) => {
        localStorage.setItem("token", token);
        setUserId(user._id);
        this.addUser(user);

        callbacks.actions && callbacks.actions(notify);
        socket.close();
      });

      socket.on("login/error", (error: NotifyErrorI) => {
        callbacks.error && callbacks.error(error);
        socket.close();
      });
    },

    logout(callbacks: CallbacksI) {
      const token = localStorage.getItem("token");
      const socket = socketBase("/auth");
      const project = useProjectStore();

      socket.emit("logout", token, localStorage.getItem("socketId"));

      socket.on("logout/success", (resp: { notify: NotifyI }) => {
        callbacks.actions && callbacks.actions(resp.notify);

        localStorage.removeItem("token");
        setTimeout(() => {
          project.clear();
          removeUserId();
          this.clear();
        }, 400);

        socket.close();
      });

      socket.on("logout/error", (error: NotifyErrorI) => {
        callbacks.error && callbacks.error(error);
        socket.close();
      });
    },

    register(form: FormsI["register"], callbacks: CallbacksI) {
      const socket = socketBase("/auth");
      socket.emit("register", form);

      socket.on("register/success", (resp: { notify: NotifyI }) => {
        callbacks.actions && callbacks.actions(resp.notify);
        socket.close();
      });

      socket.on("register/error", (error: NotifyErrorI) => {
        callbacks.error && callbacks.error(error);
        socket.close();
      });
    },
  },
});
