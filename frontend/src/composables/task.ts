import { superForm, superModals } from "@utils/inputs";
import { reactive } from "vue";

import type {
  OnChangeDroggableI,
  SelectTaskT,
  FormsI,
  TaskI,
} from "@interfaces/interfaces.task";

import { taskStore } from "@stores/task";
import { projectStore } from "@stores/project";
import { omit } from "lodash";

const optionsDragg = {
  componentData: {
    type: "transition-group",
    name: "list",
  },
  preventOnFilter: false,
  group: "description",
  ghostClass: "ghost",
  dragClass: "drag",
  disabled: false,
  animation: 200,
  itemKey: "_id",
};

const multiSelect = reactive({
  button: {
    value: false,
    toggle: () => {
      multiSelect.button.value = !multiSelect.button.value;
    },
  },
  all: {
    value: <TaskI[]>[],
    status: false,
    selectOne: (tasks: TaskI[]) => {
      multiSelect.all.value = tasks.filter((task) => task.select);
      multiSelect.all.status = false;
    },
    selectAll: (tasks: TaskI[]) => {
      tasks.map((task) => (task.select = multiSelect.all.status));
      multiSelect.all.value = tasks.filter((task) => task.select);
    },
  },
});

export default () => {
  const {
    create: createTask,
    update: updateTask,
    trash: trashTask,
    changePosition,
    getAll,

    countTask,
    query,
    tasks,
  } = taskStore();
  const { project } = projectStore();
  const select = reactive({
    data: <SelectTaskT>{},
  });

  const form = superForm({
    _author: "",
    _project: "",
    position: 0,
    name: "",
  });

  const modals = superModals({
    edite: false,
    view: false,
    trash: false,
    open: {
      update: (task: FormsI["full"]) => {
        modals.toggle("edite");
        select.data = task;
      },
      view: (task: FormsI["full"]) => {
        modals.toggle("view");
        select.data = task;
      },
    },
  });

  const create = () => {
    form._project = String(project.value?._id);
    form._author = String(project.value?._author);
    form.position = countTask.value + 1;

    createTask(omit(form, ["clear"]), {
      actions: () => form.clear(),
    });
  };

  const moveToRecycleBin = (_id: string) => trashTask([_id]);

  const changePositionTask = (evt: OnChangeDroggableI) => {
    const newIndex = evt.moved.newIndex;
    const oldIndex = evt.moved.oldIndex;
    const start = newIndex < oldIndex ? newIndex : oldIndex;
    const end = newIndex > oldIndex ? newIndex : oldIndex;

    const updatePositions: Pick<TaskI, "_id" | "position">[] = [];

    if (query.value.sort.includes("desc")) {
      const currentCount = countTask.value - 1;
      for (let i = currentCount - start; i >= currentCount - end; i--) {
        tasks.value.data[currentCount - i].position = i;
        updatePositions.push({
          _id: tasks.value.data[currentCount - i]._id,
          position: i,
        });
      }
    } else
      for (let i = start; i <= end; i++) {
        tasks.value.data[i].position = i;
        updatePositions.push({
          _id: tasks.value.data[i]._id,
          position: i,
        });
      }

    changePosition(updatePositions);
  };

  const done = (task: TaskI) => {
    task.done = !task.done;
    updateTask(task);
  };

  const moveSelectToRecycleBin = () => {
    const _ids = multiSelect.all.value.map((task) => task._id);
    trashTask(_ids);
  };

  const ascDesc = (value: "asc" | "desc") => {
    if (query.value.sort != `position:${value}`) {
      query.value.sort = `position:${value}`;
      getAll();
    }
  };

  return {
    moveSelectToRecycleBin,
    changePositionTask,
    moveToRecycleBin,
    ascDesc,
    create,
    done,

    optionsDragg,
    multiSelect,
    select,
    modals,
    query,
    form,
  };
};
