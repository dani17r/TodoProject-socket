import type { CallbacksI, NotifyI } from "@interfaces/interfaces.generals";
import userLocalStorageComposable from "@composables/userLocalStorage";
import { useSocketAction } from "@utils/main";
import useProjectStore from "@stores/project";
import { socketBase } from "@services/main";
import { defineStore } from "pinia";
import { isEmpty } from "lodash";
import type {
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

    login(form: FormsI["login"], callbacks?: CallbacksI<NotifyI>) {
      const socket = socketBase("/auth");

      const init = useSocketAction("login", socket);
      const run = init<LoginI>({
        actions: (response) => {
          const { user, token, notify } = response as LoginI;
          callbacks?.actions && callbacks.actions(notify);
          localStorage.setItem("token", token);
          setUserId(user._id);
          this.addUser(user);
        },
        error: (err) => callbacks?.error && callbacks.error(err),
      });

      run(form);
    },

    logout(callbacks?: CallbacksI<NotifyI>) {
      const token = localStorage.getItem("token");
      const socket = socketBase("/auth");
      const project = useProjectStore();

      const init = useSocketAction("logout", socket);
      const run = init<{ notify: NotifyI }>({
        actions: (response) => {
          const notify = response?.notify;
          callbacks?.actions && callbacks.actions(notify);

          localStorage.removeItem("token");
          setTimeout(() => {
            project.clear();
            removeUserId();
            this.clear();
          }, 400);
        },
        error: (err) => callbacks?.error && callbacks.error(err),
      });

      run(token);
    },

    register(form: FormsI["register"], callbacks?: CallbacksI<NotifyI>) {
      const socket = socketBase("/auth");

      const init = useSocketAction("register", socket);
      const run = init<{ notify: NotifyI }>({
        actions: (response) => {
          if (response) {
            const notify = response.notify;
            callbacks?.actions && callbacks.actions(notify);
          }
        },
        error: (err) => callbacks?.error && callbacks.error(err),
      });

      run(form);
    },
  },
});
