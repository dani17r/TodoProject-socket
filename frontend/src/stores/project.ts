import type { FormsI, StateI, ProjectI } from "@interfaces/interfaces.project";
import type { CallbacksI } from "@interfaces/interfaces.generals";
import socketServices from "@services/boot/sockets";
import { defineStore, storeToRefs } from "pinia";
import { onceMountedTwo } from "@utils/actions";
import { useSocketAction } from "@utils/main";
import { findIndex, isEmpty } from "lodash";
import eventBus from "@services/boot/eventBus";
import { userStore } from "@stores/user";
import query from "@utils/querys";

const { socketProject, socketAuth } = socketServices();

const store = defineStore("project", {
  state: (): StateI => ({
    lifecicles: {
      mounted: false,
      broadcast: true,
    },
    loading: {
      val: false,
      enable: () => (store().$state.loading.val = true),
      disable: () => (store().$state.loading.val = false),
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

    insert(projects?: StateI["projects"]) {
      if (!isEmpty(projects)) this.projects = projects;
    },

    insertOne(project?: StateI["project"]) {
      if (!isEmpty(project)) this.project = project;
    },

    getAll(verifyMounted = false) {
      onceMountedTwo(
        this,
        () => {
          this.loading.enable();
          const { user } = userStore();

          const init = useSocketAction("all", socketProject.value);
          const run = init<StateI["projects"]>({
            actions: (projects) => this.insert(projects),
            finally: () => this.loading.disable(),
          });

          run({ _author: user.value?._id, query: this.query });
        },
        verifyMounted,
      );
    },

    create(form: FormsI["inter"], callbacks?: CallbacksI<StateI["projects"]>) {
      eventBus.emit("project/create");
      this.loading.enable();

      const init = useSocketAction("create", socketProject.value);
      const run = init<StateI["projects"]>(callbacks, {
        actions: (projects) => this.insert(projects),
        finally: () => this.loading.disable(),
      });

      run({ form, query: this.query });
    },

    changeShare(newUpdate: ProjectI) {
      this.loading.enable();
      eventBus.emit("project/change-share");

      const init = useSocketAction("change-share", socketProject.value);
      const run = init<StateI["projects"]>({
        finally: () => this.loading.disable(),
      });

      run(newUpdate);
    },

    changeShareUsers(project: ProjectI) {
      eventBus.emit("user/change-share");

      const getUsersIds = project.share.private.group.map((item) => item._id);
      const init = useSocketAction("change-share-user", socketAuth.value);
      const run = init({});

      run(getUsersIds);
    },

    update(form: Partial<FormsI["full"]>, callbacks?: CallbacksI<ProjectI>) {
      this.loading.enable();
      eventBus.emit("project/update");

      const init = useSocketAction("update", socketProject.value);
      const run = init<ProjectI>(callbacks, {
        actions: (updatedProject) => {
          const index = findIndex(this.projects.data, { _id: form._id });
          if (updatedProject) {
            this.projects.data[index] = updatedProject;
            this.project = updatedProject;
          }
        },
        finally: () => this.loading.disable(),
      });

      run(form);
    },

    remove(_id: ProjectI["_id"], callbacks?: CallbacksI<StateI["projects"]>) {
      eventBus.emit("project/delete");
      const { user } = userStore();

      const init = useSocketAction("delete", socketProject.value);
      const run = init<StateI["projects"]>(callbacks, {
        actions: (projects) => this.removeAndPreviePaginate(projects),
      });

      run({ _author: user.value?._id, query: this.query, _id });
    },

    removeAndPreviePaginate(projects?: StateI["projects"]) {
      if (projects) {
        if (this.lifecicles.broadcast) {
          setTimeout(() => (this.lifecicles.broadcast = true), 1000);
          this.lifecicles.broadcast = false;
          if (projects.paginate?.totalPaginate == 0) {
            this.query.pag > 1 && (this.query.pag = Number(this.query.pag) - 1);
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
