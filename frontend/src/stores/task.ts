import type {
  CallbacksI,
  FormsI,
  StateI,
  TaskI,
} from "@interfaces/interfaces.task";
import type { NotifyErrorI, NotifyI } from "@interfaces/interfaces.generals";
import userLocalStorageComposable from "@composables/userLocalStorage";
import { socketBase } from "@services/main";
import { findIndex, isEmpty } from "lodash";
import { defineStore } from "pinia";
import query from "@utils/querys";

type taskPosition = Pick<TaskI, "_id" | "position">[];

const { getUserId } = userLocalStorageComposable();
export default defineStore("task", {
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
      this.lifecicles.mounted = false;
      this.tasks = { data: [], trash: [] };
      this.query = query.task;
    },
    onceMounted(callback: CallbacksI["actions"], verifyMounted = true) {
      if (callback)
        if (verifyMounted) {
          if (!this.lifecicles.mounted) {
            this.lifecicles.mounted = true;
            callback();
          }
        } else callback();
    },
    setProjectId(id: string) {
      if (this.project_id != id) this.project_id = id;
    },
    insert(tasks: StateI["tasks"]) {
      if (!isEmpty(tasks)) this.tasks = tasks;
    },
    getAll(verifyMounted = false) {
      const _project = this.project_id;
      const query = this.query;
      this.countTask;

      this.onceMounted(() => {
        const socket = socketBase("/task", getUserId.value);
        socket.emit("all", { query, _project });
        socket.on("all", (tasks: StateI["tasks"]) => {
          this.insert(tasks);
          socket.close();
        });
      }, verifyMounted);
    },
    create(form: FormsI["inter"], callbacks?: CallbacksI) {
      const socket = socketBase("/task", getUserId.value);
      socket.emit("create", { form, query: this.query });

      socket.on("create/success", (tasks: StateI["tasks"]) => {
        this.insert(tasks);
        callbacks?.actions && callbacks.actions();
        socket.close();
      });

      socket.on("create/error", (err: NotifyErrorI) => {
        callbacks?.error && callbacks.error(err);
        socket.close();
      });
    },
    update(form: FormsI["full"], callbacks?: CallbacksI) {
      const socket = socketBase("/task", getUserId.value);
      socket.emit("update", form);

      socket.on("update/success", (newTask: TaskI) => {
        const index = findIndex(this.tasks.data, { _id: form._id });
        this.tasks.data[index] = newTask;
        callbacks?.actions && callbacks.actions();
        socket.close();
      });

      socket.on("update/error", (err: NotifyErrorI) => {
        callbacks?.error && callbacks.error(err);
        socket.close();
      });
    },
    changePosition(tasks: taskPosition, callbacks?: CallbacksI) {
      const socket = socketBase("/task", getUserId.value);
      socket.emit("change-position", tasks);

      socket.on("change-position/success", () => {
        callbacks?.actions && callbacks.actions();
        socket.close();
      });

      socket.on("change-position/error", (err: NotifyErrorI) => {
        callbacks?.error && callbacks.error(err);
        socket.close();
      });
    },
    trash(_id: TaskI["_id"], callbacks?: CallbacksI) {
      const socket = socketBase("/task", getUserId.value);
      socket.emit("trash", {
        _project: this.project_id,
        query: this.query,
        _id,
      });

      socket.on("trash/success", (tasks: StateI["tasks"]) => {
        this.insert(tasks);
        callbacks?.actions && callbacks?.actions();
        socket.close();
      });

      socket.on("trash/error", (err: NotifyI) => {
        callbacks?.error && callbacks.error(err);
        socket.close();
      });
    },
    remove(_id: TaskI["_id"], callbacks?: CallbacksI) {
      const socket = socketBase("/task", getUserId.value);
      socket.emit("delete", {
        _project: this.project_id,
        query: this.query,
        _id,
      });

      socket.on("delete/success", (tasks: StateI["tasks"]) => {
        this.insert(tasks);
        callbacks?.actions && callbacks.actions();
        socket.close();
      });

      socket.on("delete/error", (err: NotifyI) => {
        callbacks?.error && callbacks.error(err);
        socket.close();
      });
    },
    removeAll(callbacks?: CallbacksI) {
      const socket = socketBase("/task", getUserId.value);
      socket.emit("delete-all", {
        _project: this.project_id,
        query: this.query,
      });

      socket.on("delete-all/success", (tasks: StateI["tasks"]) => {
        callbacks?.actions && callbacks.actions();
        this.insert(tasks);
        socket.close();
      });

      socket.on("delete-all/error", (err: NotifyI) => {
        callbacks?.error && callbacks.error(err);
        socket.close();
      });
    },
  },
});
