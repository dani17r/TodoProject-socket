import type { FormsI, StateI, ProjectI } from "@interfaces/interfaces.project";
import userLocalStorageComposable from "@composables/userLocalStorage";
import type { CallbacksI } from "@interfaces/interfaces.generals";
import { socketBase, socketTask } from "@services/main";
import { defineStore, storeToRefs } from "pinia";
import { useSocketAction } from "@utils/main";
import { findIndex, isEmpty } from "lodash";
import { onceMounted } from "@utils/actions";
import eventBus from "@services/eventBus";
import { userStore } from "@stores/user";
import query from "@utils/querys";

const { getUserId } = userLocalStorageComposable();

const store = defineStore("project", {
  state: (): StateI => ({
    lifecicles: {
      mounted: false,
      broadcast: true,
    },
    projects: { data: [] },
    query: query.project,
    shared: null,
    project: null,
  }),
  actions: {
    clear() {
      this.lifecicles.mounted = false;
      this.projects = { data: [] };
      this.query = query.project;
    },

    insert(projects?: StateI["projects"]) {
      if (!isEmpty(projects)) this.projects = projects;
    },

    insertOne(project?: StateI["project"]) {
      if (!isEmpty(project)) this.project = project;
    },

    async getAll(verifyMounted = false) {
      await onceMounted(this, (promise) => {
          const { user } = userStore();

          const socket = socketBase("/project", getUserId.value);

          const init = useSocketAction("all", socket);
          const run = init<StateI["projects"]>({
            error: () => promise?.reject(),
            actions: (projects) => {
              this.insert(projects);
              promise?.resolve();
            },
          });

          run({ _author: user.value?._id, query: this.query });
        },
        verifyMounted
      );
    },

    async getShared(verifyMounted = false) {
      eventBus.emit("user/change-share");

      await onceMounted(this, (promise) => {
          const socket = socketBase("/project", getUserId.value);

          const init = useSocketAction("shared", socket);
          const run = init<StateI["shared"]>({
            actions: (shared) => {
              if (shared) this.shared = shared;
              promise?.resolve();
            },
            error: () => promise?.reject(),
          });

          run();
        },
        verifyMounted
      );
    },

    create(form: FormsI["inter"], callbacks?: CallbacksI<StateI["projects"]>) {
      eventBus.emit("project/create");

      const socket = socketBase("/project", getUserId.value);
      const init = useSocketAction("create", socket);
      const run = init<StateI["projects"]>(callbacks, {
        actions: (projects) => this.insert(projects),
      });

      run({ form, query: this.query });
    },

    changeShare(newUpdate: ProjectI) {
      eventBus.emit("task/change-share");

      const socket = socketTask("/task", String(this.project?._id));
      socket.emit(`change-share`, newUpdate);
    },

    update(form: Partial<FormsI["full"]>, callbacks?: CallbacksI<ProjectI>) {
      eventBus.emit("project/update");

      const socket = socketBase("/project", getUserId.value);

      const init = useSocketAction("update", socket);
      const run = init<ProjectI>(callbacks, {
        actions: (updatedProject) => {
          const index = findIndex(this.projects.data, { _id: form._id });
          if (updatedProject) {
            this.projects.data[index] = updatedProject;
            this.project = updatedProject;
          }
        },
      });

      run(form);
    },

    remove(_id: ProjectI["_id"], callbacks?: CallbacksI<StateI["projects"]>) {
      eventBus.emit("project/delete");
      const { user } = userStore();

      const socket = socketBase("/project", getUserId.value);
      const init = useSocketAction("delete", socket);
      const run = init<StateI["projects"]>(callbacks, {
        actions: async (projects) => await this.removeAndPreviePaginate(projects),
      });

      run({ _author: user.value?._id, query: this.query, _id });
    },

    async removeAndPreviePaginate(projects?: StateI["projects"]) {
      if (projects) {
        if (this.lifecicles.broadcast) {
          setTimeout(() => (this.lifecicles.broadcast = true), 1000);
          this.lifecicles.broadcast = false;
          if (projects.paginate?.totalPaginate == 0) {
            if (this.query.pag > 1) {
              this.query.pag = Number(this.query.pag) - 1;
            }
            await this.getAll();
          } else this.insert(projects);
        }
      }
    },
  },
});

export const projectStore = () => {
  const useStore = store();
  return {
    ...useStore,
    ...storeToRefs(useStore),
  };
};

export default store;
