import type { CallbacksI, NotifyI } from "@interfaces/interfaces.generals";
import userLocalStorageComposable from "@composables/userLocalStorage";
import shareComposable from "@composables/share";
import { defineStore, storeToRefs } from "pinia";
import { useSocketAction } from "@utils/main";
import useProjectStore from "@stores/project";
import { socketBase } from "@services/main";
import eventBus from "@services/eventBus";
import query from "@utils/querys";
import { isEmpty } from "lodash";
import type {
  FormsI,
  LoginI,
  StateI,
  UserI,
} from "@interfaces/interfaces.user";

const { removeUserId, setUserId, getUserId } = userLocalStorageComposable();

const store = defineStore("user", {
  state: (): StateI => ({
    lifecicles: {
      mounted: false,
    },
    query: query.user,
    users: { data: [] },
    user: null,
  }),
  getters: {
    isLogin: (store) => store.user == null,
  },
  actions: {
    onceMounted(callback: CallbacksI["actions"], verifyMounted = true) {
      if (verifyMounted) {
        if (!this.lifecicles.mounted) {
          this.lifecicles.mounted = true;
          callback && callback();
        }
      } else callback && callback();
    },

    clear() {
      this.lifecicles.mounted = false;
      this.user = null;
    },

    addUser(newUser: UserI) {
      if (!this.lifecicles.mounted) !isEmpty(newUser) && (this.user = newUser);
    },

    refresh() {
      const socket = socketBase("/auth");

      const token = localStorage.getItem("token") ?? null;
      socket.emit("status", token);
      socket.on("status/response", ({ user }) => {
        if (!isEmpty(user)) this.addUser(user);
        socket.close();
      });
      socket.io.on("error", () => socket.close());
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
      eventBus.emit("user/update");
      const socket = socketBase("/auth", getUserId.value);

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

    insert(users?: StateI["users"]) {
      if (users) this.users = users;
    },
    restartUsers() {
      this.users = { data: [] };
    },

    getAll(callbacks?: CallbacksI<StateI["users"]>, verifyMounted = false) {
      const { droupPrivateIds } = shareComposable();

      this.onceMounted(() => {
        const socket = socketBase("/user", getUserId.value);

        const init = useSocketAction("all", socket);
        const run = init<StateI["users"]>({
          actions: (users) => {
            this.insert(users);
            callbacks?.actions && callbacks.actions(users);
          },
        });

        run({ query: this.query, _ids: droupPrivateIds.value });
      }, verifyMounted);
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
