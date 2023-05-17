import userLocalStorageComposable from "@composables/userLocalStorage";
import type { CallbacksI } from "@interfaces/interfaces.generals";
import { defineStore, storeToRefs } from "pinia";
import { useSocketAction } from "@utils/main";
import { socketBase } from "@services/main";
import { findIndex, isEmpty } from "lodash";
import eventBus from "@services/eventBus";
import query from "@utils/querys";
import type {
  TaskPositionI,
  FormsI,
  StateI,
  TaskI,
} from "@interfaces/interfaces.task";

const { getUserId } = userLocalStorageComposable();

const store = defineStore("task", {
  state: (): StateI => ({
    lifecicles: { mounted: false },
    tasks: { data: [], trash: [] },
    query: query.task,
    project_id: "",
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

    onceMounted(callback: CallbacksI["actions"], verifyMounted = true) {
      if (verifyMounted) {
        if (!this.lifecicles.mounted) {
          this.lifecicles.mounted = true;
          callback && callback();
        }
      } else callback && callback();
    },

    setProjectId(id: string) {
      if (this.project_id != id) this.project_id = id;
    },

    insert(tasks?: StateI["tasks"]) {
      if (!isEmpty(tasks)) this.tasks = tasks;
    },

    getAll(verifyMounted = false) {
      this.countTask;

      this.onceMounted(() => {
        const socket = socketBase("/task", getUserId.value);
        const init = useSocketAction("all", socket);
        const run = init<StateI["tasks"]>({
          actions: (tasks) => this.insert(tasks),
        });

        run({ query: this.query, _project: this.project_id });
      }, verifyMounted);
    },

    create(form: FormsI["inter"], callbacks?: CallbacksI) {
      eventBus.emit("task/create");

      const socket = socketBase("/task", getUserId.value);

      const init = useSocketAction("create", socket);
      const run = init<StateI["tasks"]>(callbacks, {
        actions: (tasks) => this.insert(tasks),
      });

      run({ form, query: this.query });
    },

    update(form: FormsI["full"], callbacks?: CallbacksI) {
      eventBus.emit("task/update");

      const socket = socketBase("/task", getUserId.value);

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

      const socket = socketBase("/task", getUserId.value);
      const init = useSocketAction("change-position", socket);
      const run = init(callbacks);

      run(tasks);
    },

    trash(_ids: TaskI["_id"][], callbacks?: CallbacksI) {
      eventBus.emit("task/trash");

      const socket = socketBase("/task", getUserId.value);
      const init = useSocketAction("trash", socket);
      const run = init<StateI["tasks"]>(callbacks, {
        actions: (tasks) => this.insert(tasks),
      });

      run({ _project: this.project_id, query: this.query, _ids });
    },

    remove(_id: TaskI["_id"], callbacks?: CallbacksI) {
      eventBus.emit("task/delete");

      const socket = socketBase("/task", getUserId.value);
      const init = useSocketAction("delete", socket);
      const run = init<StateI["tasks"]>(callbacks, {
        actions: (tasks) => this.insert(tasks),
      });

      run({ _project: this.project_id, query: this.query, _id });
    },

    removeAll(callbacks?: CallbacksI) {
      eventBus.emit("task/delete-all");

      const socket = socketBase("/task", getUserId.value);

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
