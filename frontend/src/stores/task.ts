import type { CallbacksI } from "@interfaces/interfaces.generals";
import { defineStore, storeToRefs } from "pinia";
import { useSocketAction } from "@utils/main";
import { onceMountedTwo } from "@utils/actions";
import { socketTask } from "@services/main";
import { findIndex, isEmpty } from "lodash";
import eventBus from "@services/eventBus";
import query from "@utils/querys";
import type {
  TaskPositionI,
  FormsI,
  StateI,
  TaskI,
} from "@interfaces/interfaces.task";

const store = defineStore("task", {
  state: (): StateI => ({
    lifecicles: { mounted: false },
    tasks: { data: [], trash: [] },
    query: query.task,
    project_id: "",
    loading: {
      val: false,
      enable: () => (store().$state.loading.val = true),
      disable: () => (store().$state.loading.val = false),
    },
  }),
  getters: {
    countTask: (state) => state.tasks.data.length,
  },
  actions: {
    clear() {
      this.tasks = { data: [], trash: [] };
      this.lifecicles.mounted = false;
      this.query = query.task;
    },

    setProjectId(id: string) {
      if (this.project_id != id) this.project_id = id;
    },

    insert(tasks?: StateI["tasks"]) {
      if (!isEmpty(tasks)) this.tasks = tasks;
    },

    getAll(verifyMounted = false) {
      this.countTask;

      onceMountedTwo(
        this,
        () => {
          this.loading.enable();
          const socket = socketTask("/task", this.project_id);
          const init = useSocketAction("all", socket);
          const run = init<StateI["tasks"]>({
            actions: (tasks) => this.insert(tasks),
            finally: () => this.loading.disable(),
          });

          run({ query: this.query, _project: this.project_id });
        },
        verifyMounted,
      );
    },

    create(form: FormsI["inter"], callbacks?: CallbacksI) {
      eventBus.emit("task/create");

      const socket = socketTask("/task", this.project_id);

      const init = useSocketAction("create", socket);
      const run = init<StateI["tasks"]>(callbacks, {
        actions: (tasks) => this.insert(tasks),
      });

      run({ form, query: this.query });
    },

    update(form: FormsI["full"], callbacks?: CallbacksI) {
      eventBus.emit("task/update");

      const socket = socketTask("/task", this.project_id);

      const init = useSocketAction("update", socket);
      const run = init<TaskI>(callbacks, {
        actions: (newTask) => {
          const index = findIndex(this.tasks.data, { _id: form._id });
          if (newTask) this.tasks.data[index] = newTask;
        },
      });

      run(form);
    },

    changePosition(tasks: TaskPositionI, callbacks?: CallbacksI) {
      eventBus.emit("task/move");

      const socket = socketTask("/task", this.project_id);
      const init = useSocketAction("change-position", socket);
      const run = init(callbacks);

      run(tasks);
    },

    trash(_ids: TaskI["_id"][], callbacks?: CallbacksI) {
      eventBus.emit("task/trash");

      const socket = socketTask("/task", this.project_id);
      const init = useSocketAction("trash", socket);
      const run = init<StateI["tasks"]>(callbacks, {
        actions: (tasks) => this.insert(tasks),
      });

      run({ _project: this.project_id, query: this.query, _ids });
    },

    remove(_id: TaskI["_id"], callbacks?: CallbacksI) {
      eventBus.emit("task/delete");

      const socket = socketTask("/task", this.project_id);
      const init = useSocketAction("delete", socket);
      const run = init<StateI["tasks"]>(callbacks, {
        actions: (tasks) => this.insert(tasks),
      });

      run({ _project: this.project_id, query: this.query, _id });
    },

    removeAll(callbacks?: CallbacksI) {
      eventBus.emit("task/delete-all");

      const socket = socketTask("/task", this.project_id);

      const init = useSocketAction("delete-all", socket);
      const run = init<StateI["tasks"]>(callbacks, {
        actions: (tasks) => this.insert(tasks),
      });

      run({ _project: this.project_id, query: this.query });
    },
  },
});

export const taskStore = () => {
  const useStore = store();
  return {
    ...useStore,
    ...storeToRefs(useStore),
  };
};

export default store;
