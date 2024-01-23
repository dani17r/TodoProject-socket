import userLocalStorageComposable from "@composables/userLocalStorage";
import socketServices from "@services/boot/sockets";
import shareComposable from "@composables/share";
import useProjectStore from "@stores/project";
import useTaskStore from "@stores/task";
import { useRoute } from "vue-router";
import eventBus from "./boot/eventBus";
import { reactive } from "vue";

const status = reactive({
  changeShare: true,
  deleteAll: true,
  create: true,
  update: true,
  delete: true,
  trash: true,
  move: true,
});

export default () => {
  const { socketTask, socketProject } = socketServices();
  const { getProjectId } = userLocalStorageComposable();
  const urlSocket = `broadcast:${getProjectId.value}`;
  // console.log(`${urlSocket}/update`);
  const { initPermissions } = shareComposable();
  const projectStore = useProjectStore();
  const taskStore = useTaskStore();
  const route = useRoute();

  eventBus.on("project/change-share", () => (status.changeShare = false));
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
    console.log('uyuy');
    
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

  socketProject.value.on(`${urlSocket}/change-share`, (updateProject) => {
      setTimeout(() => (status.changeShare = true), 300);
      if (status.changeShare) {
        projectStore.project = updateProject;
        initPermissions();
        route.meta.type = updateProject.share.public.status
          ? "public"
          : "private";
      }
    },
  );

  return socketTask;
};
