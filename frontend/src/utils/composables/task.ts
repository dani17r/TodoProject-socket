import { superForm, superModals } from "@utils/inputs";
import { storeToRefs } from "pinia";
import { reactive } from "vue";

import type {
  OnChangeDroggableI,
  SelectTaskT,
  FormsI,
  TaskI,
} from "@interfaces/interfaces.task";

import useTaskStore from "@stores/task";
import useUserStore from "@stores/user";
import { omit } from "lodash";

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
  const store = useTaskStore();
  const userStore = useUserStore();

  const { query, project_id, countTask } = storeToRefs(store);
  const select = reactive({
    data: <SelectTaskT>{},
  });

  const form = superForm({
    _autor: String(userStore.current?._id),
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
    form._project = project_id.value;
    form.position = countTask.value + 1;

    store.create(omit(form, ["clear"]), {
      actions: () => form.clear(),
    });
  };

  const moveToRecycleBin = (_id: string) => store.trash([_id]);

  const changePositionTask = (evt: OnChangeDroggableI) => {
    const newIndex = evt.moved.newIndex;
    const oldIndex = evt.moved.oldIndex;
    const start = newIndex < oldIndex ? newIndex : oldIndex;
    const end = newIndex > oldIndex ? newIndex : oldIndex;

    const updatePositions: Pick<TaskI, "_id" | "position">[] = [];

    if (query.value.sort.includes("desc")) {
      const currentCount = countTask.value - 1;
      for (let i = currentCount - start; i >= currentCount - end; i--) {
        store.tasks.data[currentCount - i].position = i;
        updatePositions.push({
          _id: store.tasks.data[currentCount - i]._id,
          position: i,
        });
      }
    } else
      for (let i = start; i <= end; i++) {
        store.tasks.data[i].position = i;
        updatePositions.push({
          _id: store.tasks.data[i]._id,
          position: i,
        });
      }

    store.changePosition(updatePositions);
  };

  const done = (task: TaskI) => {
    task.done = !task.done;
    store.update(task);
  };

  const moveSelectToRecycleBin = () => {
    const _ids = multiSelect.all.value.map((task) => task._id);
    store.trash(_ids);
  };

  const ascDesc = (value: "asc" | "desc") => {
    if (query.value.sort != `position:${value}`) {
      query.value.sort = `position:${value}`;
      store.getAll();
    }
  };

  return {
    moveSelectToRecycleBin,
    changePositionTask,
    moveToRecycleBin,
    multiSelect,
    ascDesc,
    select,
    create,
    modals,
    query,
    done,
    form,
  };
};
