import userLocalStorageComposable from "@composables/userLocalStorage";
import socketServices from "@services/boot/sockets";
import useTaskStore from "@stores/task";
import eventBus from "./boot/eventBus";
import { reactive } from "vue";

const status = reactive({
  deleteAll: true,
  create: true,
  update: true,
  delete: true,
  trash: true,
  move: true,
});

export default () => {
  const { getProjectId } = userLocalStorageComposable();
  const urlSocket = `broadcast:${getProjectId.value}`;
  const { socketTask } = socketServices();
  const taskStore = useTaskStore();

  eventBus.on("task/delete-all", () => (status.deleteAll = false));
  eventBus.on("task/update", () => (status.update = false));
  eventBus.on("task/create", () => (status.create = false));
  eventBus.on("task/delete", () => (status.delete = false));
  eventBus.on("task/trash", () => (status.trash = false));
  eventBus.on("task/move", () => (status.move = false));

  socketTask.value.on(`${urlSocket}/create`, () => {
    setTimeout(() => (status.create = true), 300);
    if (status.create) taskStore.getAll();
  });

  socketTask.value.on(`${urlSocket}/update`, () => {
    setTimeout(() => (status.update = true), 300);
    if (status.update) taskStore.getAll();
  });

  socketTask.value.on(`${urlSocket}/trash`, () => {
    setTimeout(() => (status.trash = true), 300);
    if (status.trash) taskStore.getAll();
  });

  socketTask.value.on(`${urlSocket}/change-position`, () => {
    setTimeout(() => (status.move = true), 300);
    if (status.move) taskStore.getAll();
  });

  socketTask.value.on(`${urlSocket}/delete`, () => {
    setTimeout(() => (status.delete = true), 300);
    if (status.delete) taskStore.getAll();
  });

  socketTask.value.on(`${urlSocket}/delete-all`, () => {
    setTimeout(() => (status.deleteAll = true), 300);
    if (status.deleteAll) taskStore.getAll();
  });

  return socketTask;
};
