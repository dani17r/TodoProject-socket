import type {
  CallbacksI,
  FormsI,
  StateI,
  ProjectI,
} from "@interfaces/interfaces.project";
import type { NotifyErrorI, NotifyI } from "@interfaces/interfaces.generals";
import userLocalStorageComposable from "@composables/userLocalStorage";
import { socketBase } from "@services/main";
import { findIndex, isEmpty } from "lodash";
import useUserStore from "@stores/user";
import { defineStore } from "pinia";
import query from "@utils/querys";

const { getUserId } = userLocalStorageComposable();
export default defineStore("project", {
  state: (): StateI => ({
    lifecicles: { mounted: false, broadcast: true },
    projects: { data: [] },
    query: query.project,
  }),
  actions: {
    clear() {
      this.lifecicles.mounted = false;
      this.projects = { data: [] };
      this.query = query.project;
    },
    onceMounted(callback: CallbacksI["actions"], verifyMounted = true) {
      if (verifyMounted) {
        if (!this.lifecicles.mounted) {
          this.lifecicles.mounted = true;
          callback();
        }
      } else callback();
    },
    insert(projects: StateI["projects"]) {
      if (!isEmpty(projects)) this.projects = projects;
    },
    getAll(verifyMounted = false) {
      this.onceMounted(() => {
        const user = useUserStore();

        const socket = socketBase("/project", getUserId.value);
        socket.emit("all", { query: this.query, _autor: user.current?._id });
        socket.on("all", (projects: StateI["projects"]) => {
          this.insert(projects);
          socket.close();
        });
      }, verifyMounted);
    },
    create(form: FormsI["inter"], callbacks: CallbacksI) {
      const socket = socketBase("/project", getUserId.value);
      socket.emit("create", { form, query: this.query });

      socket.on("create/success", (projects: StateI["projects"]) => {
        this.insert(projects);
        callbacks.actions();
        socket.close();
      });

      socket.on("create/error", (err: NotifyErrorI) => {
        callbacks.error(err);
        socket.close();
      });
    },
    update(form: FormsI["full"], callbacks: CallbacksI) {
      const socket = socketBase("/project", getUserId.value);
      socket.emit("update", form);

      socket.on("update/success", (newProject: ProjectI) => {
        const index = findIndex(this.projects.data, { _id: form._id });
        this.projects.data[index] = newProject;
        callbacks.actions();
        socket.close();
      });

      socket.on("update/error", (err: NotifyErrorI) => {
        callbacks.error(err);
        socket.close();
      });
    },
    remove(_id: ProjectI["_id"], callbacks: CallbacksI) {
      const user = useUserStore();

      const socket = socketBase("/project", getUserId.value);
      socket.emit("delete", {
        _autor: user.current?._id,
        query: this.query,
        _id,
      });

      socket.on("delete/success", (projects: StateI["projects"]) => {
        this.removeAndPreviePaginate(projects);
        callbacks.actions();
        socket.close();
      });

      socket.on("delete/error", (err: NotifyI) => {
        callbacks.error(err);
        socket.close();
      });
    },
    removeAndPreviePaginate(projects: StateI["projects"]) {
      if (this.lifecicles.broadcast) {
        setTimeout(() => (this.lifecicles.broadcast = true), 1000);
        this.lifecicles.broadcast = false;
        if (projects.paginate?.totalPaginate == 0) {
          if (this.query.pag > 1) this.query.pag = Number(this.query.pag) - 1;
          this.getAll();
        } else this.insert(projects);
      }
    },
  },
});
