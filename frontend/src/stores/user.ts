import type { CallbacksI, NotifyI } from "@interfaces/interfaces.generals";
import userLocalStorageComposable from "@composables/userLocalStorage";
import { defineStore, storeToRefs } from "pinia";
import { useSocketAction } from "@utils/main";
import useProjectStore from "@stores/project";
import { socketBase } from "@services/main";
import { isEmpty } from "lodash";
import type {
  FormsI,
  LoginI,
  StateI,
  UserI,
} from "@interfaces/interfaces.user";

const { removeUserId, setUserId } = userLocalStorageComposable();

const store = defineStore("user", {
  state: (): StateI => ({
    user: null,
    lifecicles: {
      mounted: false,
    },
  }),
  getters: {
    isLogin: (store) => store.user == null,
  },
  actions: {
    clear() {
      this.lifecicles.mounted = false;
      this.user = null;
    },

    addUser(newUser: UserI) {
      if (!this.lifecicles.mounted) !isEmpty(newUser) && (this.user = newUser);
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

    update(form: FormsI["update"], callbacks?: CallbacksI<NotifyI>) {
      const socket = socketBase("/auth");

      const init = useSocketAction("update", socket);
      const run = init<UserI>({
        actions: (user) => {
          user && this.addUser(user);
          callbacks?.actions && callbacks.actions();
        },
        error: (err) => callbacks?.error && callbacks.error(err),
      });

      run(form);
    },

    changePassword(
      form: FormsI["changePassword"],
      callbacks?: CallbacksI<NotifyI>
    ) {
      const socket = socketBase("/auth");

      const init = useSocketAction("change-password", socket);
      const run = init<NotifyI>({
        actions: (notify) => {
          callbacks?.actions && callbacks.actions(notify);
        },
        error: (err) => callbacks?.error && callbacks.error(err),
      });

      run(form);
    },
  },
});

export const userStore = () => {
  const useStore = store();
  return {
    ...useStore,
    ...storeToRefs(useStore),
  };
};

export default store;
