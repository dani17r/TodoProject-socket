import userLocalStorageComposable from "@composables/userLocalStorage";
import { socketBase } from "@services/main";
import { computed, reactive } from "vue";
import useTaskStore from "@stores/task";
import eventBus from "./eventBus";

const status = reactive({
  deleteAll: true,
  create: true,
  update: true,
  delete: true,
  trash: true,
  move: true,
});

export default () => {
  const { getUserId } = userLocalStorageComposable();
  const urlSocket = `broadcast:${getUserId.value}`;
  const taskStore = useTaskStore();

  eventBus.on("task/delete-all", () => (status.deleteAll = false));
  eventBus.on("task/update", () => (status.update = false));
  eventBus.on("task/create", () => (status.create = false));
  eventBus.on("task/delete", () => (status.delete = false));
  eventBus.on("task/trash", () => (status.trash = false));
  eventBus.on("task/move", () => (status.move = false));

  const socket = computed(() => socketBase("/task", getUserId.value));

  socket.value.timeout(8000).on(`${urlSocket}/create`, () => {
    setTimeout(() => (status.create = true), 300);
    if (status.create) taskStore.getAll();
  });

  socket.value.timeout(8000).on(`${urlSocket}/update`, () => {
    setTimeout(() => (status.update = true), 300);
    if (status.update) taskStore.getAll();
  });

  socket.value.timeout(8000).on(`${urlSocket}/trash`, () => {
    setTimeout(() => (status.trash = true), 300);
    if (status.trash) taskStore.getAll();
  });

  socket.value.timeout(8000).on(`${urlSocket}/change-position`, () => {
    setTimeout(() => (status.move = true), 300);
    if (status.move) taskStore.getAll();
  });

  socket.value.timeout(8000).on(`${urlSocket}/delete`, (_id: string) => {
    console.log(_id);

    setTimeout(() => (status.delete = true), 300);
    if (status.delete) taskStore.getAll();
  });

  socket.value.timeout(8000).on(`${urlSocket}/delete-all`, () => {
    setTimeout(() => (status.deleteAll = true), 300);
    if (status.deleteAll) taskStore.getAll();
  });

  return socket.value;
};
