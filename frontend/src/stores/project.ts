import type { FormsI, StateI, ProjectI } from "@interfaces/interfaces.project";
import userLocalStorageComposable from "@composables/userLocalStorage";
import type { CallbacksI } from "@interfaces/interfaces.generals";
import { defineStore, storeToRefs } from "pinia";
import { useSocketAction } from "@utils/main";
import { socketBase } from "@services/main";
import { findIndex, isEmpty } from "lodash";
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
    project: null,
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
          callback && callback();
        }
      } else callback && callback();
    },

    insert(projects?: StateI["projects"]) {
      if (!isEmpty(projects)) this.projects = projects;
    },

    insertOne(project?: StateI["project"]) {
      if (!isEmpty(project)) this.project = project;
    },

    getAll(verifyMounted = false) {
      this.onceMounted(() => {
        const { user } = userStore();

        const socket = socketBase("/project", getUserId.value);

        const init = useSocketAction("all", socket);
        const run = init<StateI["projects"]>({
          actions: (projects) => this.insert(projects),
        });

        run({ _autor: user.value?._id, query: this.query });
      }, verifyMounted);
    },

    create(form: FormsI["inter"], callbacks?: CallbacksI) {
      eventBus.emit("project/create");

      const socket = socketBase("/project", getUserId.value);
      const init = useSocketAction("create", socket);
      const run = init<StateI["projects"]>(callbacks, {
        actions: (projects) => this.insert(projects),
      });

      run({ form, query: this.query });
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

    remove(_id: ProjectI["_id"], callbacks?: CallbacksI) {
      eventBus.emit("project/delete");
      const { user } = userStore();

      const socket = socketBase("/project", getUserId.value);
      const init = useSocketAction("delete", socket);
      const run = init<StateI["projects"]>(callbacks, {
        actions: (projects) => this.removeAndPreviePaginate(projects),
      });

      run({ _autor: user.value?._id, query: this.query, _id });
    },

    removeAndPreviePaginate(projects?: StateI["projects"]) {
      if (projects) {
        if (this.lifecicles.broadcast) {
          setTimeout(() => (this.lifecicles.broadcast = true), 1000);
          this.lifecicles.broadcast = false;
          if (projects.paginate?.totalPaginate == 0) {
            if (this.query.pag > 1) {
              this.query.pag = Number(this.query.pag) - 1;
            }
            this.getAll();
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
