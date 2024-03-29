import type {
  FormsI,
  LoginI,
  StateI,
  UserI,
} from "@interfaces/interfaces.user";
import type { CallbacksI, NotifyI } from "@interfaces/interfaces.generals";
import userLocalStorageComposable from "@composables/userLocalStorage";
import generalComposable from "@composables/general";
import socketServices from "@services/boot/sockets";
import shareComposable from "@composables/share";
import { defineStore, storeToRefs } from "pinia";
import { onceMountedTwo } from "@utils/actions";
import { useSocketAction } from "@utils/main";
import useProjectStore from "@stores/project";
import eventBus from "@services/boot/eventBus";
import query from "@utils/querys";
import { isEmpty } from "lodash";

const { removeUserId, setUserId } = userLocalStorageComposable();
const { socketAuth, socketUser } = socketServices();
const { loading } = generalComposable();

const store = defineStore("user", {
  state: (): StateI => ({
    lifecicles: {
      mounted: false,
    },
    query: query.user,
    users: { data: [] },
    user: null,
    shared: null,
    loading: {
      val: false,
      enable: () => (store().$state.loading.val = true),
      disable: () => (store().$state.loading.val = false),
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
      if (!this.lifecicles.mounted) {
        !isEmpty(newUser) && (this.user = newUser);
      }
    },

    refresh() {
      const token = localStorage.getItem("token") ?? null;

      socketAuth.value.emit("status", token);
      socketAuth.value.io.on("error", () => socketAuth.value.close());
      socketAuth.value.on("status/response", ({ user }) => {
        if (!isEmpty(user)) this.addUser(user);
        // socket.close();
      });
    },

    login(form: FormsI["login"], callbacks?: CallbacksI<NotifyI>) {
      loading.enable();
      const init = useSocketAction("login", socketAuth.value);
      const run = init<LoginI>({
        actions: (response) => {
          const { user, token, notify } = response as LoginI;
          callbacks?.actions && callbacks.actions(notify);
          localStorage.setItem("token", token);
          setUserId(user._id);
          this.addUser(user);
        },
        finally: () => loading.disable(),
      });

      run(form);
    },

    logout(callbacks?: CallbacksI<NotifyI>) {
      const token = localStorage.getItem("token");
      const project = useProjectStore();

      loading.enable();
      const init = useSocketAction("logout", socketAuth.value);
      const run = init<NotifyI, { notify: NotifyI }>(callbacks, {
        actions: (response) => {
          const { notify } = response as LoginI;
          callbacks?.actions && callbacks.actions(notify);
          localStorage.removeItem("token");
        },
        finally: () =>
          setTimeout(() => {
            loading.disable();
            project.clear();
            removeUserId();
            this.clear();
          }, 300),
      });

      run(token);
    },

    register(form: FormsI["register"], callbacks?: CallbacksI<NotifyI>) {
      loading.enable();
      const init = useSocketAction("register", socketAuth.value);
      const run = init<{ notify: NotifyI }>({
        actions: (response) => {
          const { notify } = response as LoginI;
          callbacks?.actions && callbacks.actions(notify);
        },
        finally: () => loading.disable(),
      });

      run(form);
    },

    update(form: FormsI["update"], callbacks?: CallbacksI<NotifyI>) {
      eventBus.emit("user/update");
      const init = useSocketAction("update", socketAuth.value);
      const run = init<NotifyI, UserI>(callbacks, {
        actions: (user) => user && this.addUser(user),
      });

      run(form);
    },

    changePassword(
      form: FormsI["changePassword"],
      callbacks?: CallbacksI<NotifyI>,
    ) {
      const init = useSocketAction("change-password", socketAuth.value);
      const run = init<NotifyI>({
        actions: (notify) => callbacks?.actions && callbacks.actions(notify),
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
      onceMountedTwo(
        this,
        () => {
          const { droupPrivateIds } = shareComposable();

          const init = useSocketAction("all", socketUser.value);
          const run = init<StateI["users"]>(callbacks, {
            actions: (data) => this.insert(data),
          });

          run({ query: this.query, _ids: droupPrivateIds.value });
        },
        verifyMounted,
      );
    },

    getSharedUser(
      callbacks?: CallbacksI<StateI["shared"]>,
      verifyMounted = false,
    ) {
      onceMountedTwo(
        this,
        () => {
          const init = useSocketAction("shared-with-user", socketAuth.value);
          const run = init<StateI["shared"]>(callbacks, {
            actions: (shared) => (this.shared = shared as StateI["shared"]),
          });
          run();
        },
        verifyMounted,
      );
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
