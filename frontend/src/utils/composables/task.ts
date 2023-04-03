import { superForm, superModals } from "@utils/inputs";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import type {
  FormsI,
  OnChangeDroggableI,
  SelectTaskT,
  TaskI,
} from "@interfaces/interfaces.task";

// import notifyComposable from "@composables/notify";
import useTaskStore from "@stores/task";
import useUserStore from "@stores/user";
import { omit } from "lodash";

const multiSelect = ref(false);
const multiSelectAll = ref<TaskI[]>();

export default () => {
  const taskStore = useTaskStore();
  const userStore = useUserStore();

  const { query, project_id, countTask } = storeToRefs(taskStore);
  const selectTask = ref<SelectTaskT>({});

  const newTask = superForm({
    _autor: String(userStore.current?._id),
    _project: "",
    position: 0,
    name: "",
  });

  const modals = superModals({
    edite: false,
    trash: false,
  });

  const createTask = () => {
    newTask._project = project_id.value;
    newTask.position = countTask.value;

    taskStore.create(omit(newTask, ["clear"]), {
      actions: () => {
        newTask.clear();
      },
      error: () => {
        newTask.clear();
      },
    });
  };

  const deleteTask = (_id: string) => taskStore.trash(_id);

  const openUpdateTask = (task: FormsI["full"]) => {
    modals.toggle("edite");
    selectTask.value = task;
  };

  const changePositionTask = (evt: OnChangeDroggableI) => {
    const position = evt.moved;
    const start =
      position.newIndex < position.oldIndex
        ? position.newIndex
        : position.oldIndex;
    const end =
      position.newIndex > position.oldIndex
        ? position.newIndex
        : position.oldIndex;

    const updatePositionTasks: Pick<TaskI, "_id" | "position">[] = [];

    if (query.value.sort.includes("desc")) {
      const currentCount = countTask.value - 1;
      for (let i = currentCount - start; i >= currentCount - end; i--) {
        taskStore.tasks.data[currentCount - i].position = i;
        updatePositionTasks.push({
          _id: taskStore.tasks.data[currentCount - i]._id,
          position: i,
        });
      }
    } else
      for (let i = start; i <= end; i++) {
        taskStore.tasks.data[i].position = i;
        updatePositionTasks.push({
          _id: taskStore.tasks.data[i]._id,
          position: i,
        });
      }

    taskStore.changePosition(updatePositionTasks);
  };

  const doneTask = (task: TaskI) => {
    task.done = !task.done;
    taskStore.update(task);
  };

  const selectMultiple = () => {
    taskStore.tasks.data.map((task) => (task.select = !task.select));
    multiSelectAll.value = taskStore.tasks.data.filter((task) => task.select);
  };

  const selectOneTask = () => {
    multiSelectAll.value = taskStore.tasks.data.filter((task) => task.select);
  };

  const moveTrash = () => {
    multiSelectAll.value?.map((task) => ({ _id: task._id }));
  };

  const toggleMultiSelect = () => (multiSelect.value = !multiSelect.value);

  const ascDescTask = (value: "asc" | "desc") => {
    if (query.value.sort != `position:${value}`) {
      query.value.sort = `position:${value}`;
      taskStore.getAll();
    }
  };

  return {
    changePositionTask,
    toggleMultiSelect,
    openUpdateTask,
    multiSelectAll,
    selectMultiple,
    selectOneTask,
    multiSelect,
    ascDescTask,
    deleteTask,
    selectTask,
    createTask,
    moveTrash,
    doneTask,
    newTask,
    modals,
    query,
  };
};
