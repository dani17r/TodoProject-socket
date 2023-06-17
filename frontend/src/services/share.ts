import useProjectStore from "@stores/project";
import { socketTask } from "@services/main";
import { computed, reactive } from "vue";
import useTaskStore from "@stores/task";
import eventBus from "./eventBus";
import { useRoute } from "vue-router";

import shareComposable from "@composables/share";

const status = reactive({
  changeShare: true,
  deleteAll: true,
  create: true,
  update: true,
  delete: true,
  trash: true,
  move: true,
});

export default (projectId: string) => {
  const { initPermissions } = shareComposable();
  const urlSocket = `broadcast:${projectId}`;
  const projectStore = useProjectStore();
  const taskStore = useTaskStore();
  const route = useRoute();

  eventBus.on("task/change-share", () => (status.changeShare = false));
  eventBus.on("task/delete-all", () => (status.deleteAll = false));
  eventBus.on("task/update", () => (status.update = false));
  eventBus.on("task/create", () => (status.create = false));
  eventBus.on("task/delete", () => (status.delete = false));
  eventBus.on("task/trash", () => (status.trash = false));
  eventBus.on("task/move", () => (status.move = false));

  const socket = computed(() => socketTask("/task", projectId));

  socket.value.on(`${urlSocket}/create`, () => {
    setTimeout(() => (status.create = true), 300);
    if (status.create) taskStore.getAll();
  });

  socket.value.on(`${urlSocket}/update`, () => {
    setTimeout(() => (status.update = true), 300);
    if (status.update) taskStore.getAll();
  });

  socket.value.on(`${urlSocket}/trash`, () => {
    setTimeout(() => (status.trash = true), 300);
    if (status.trash) taskStore.getAll();
  });

  socket.value.on(`${urlSocket}/change-position`, () => {
    setTimeout(() => (status.move = true), 300);
    if (status.move) taskStore.getAll();
  });

  socket.value.on(`${urlSocket}/delete`, () => {
    setTimeout(() => (status.delete = true), 300);
    if (status.delete) taskStore.getAll();
  });

  socket.value.on(`${urlSocket}/delete-all`, () => {
    setTimeout(() => (status.deleteAll = true), 300);
    if (status.deleteAll) taskStore.getAll();
  });

  socket.value.on(`${urlSocket}/change-share`, (updateProject) => {
    setTimeout(() => (status.changeShare = true), 300);
    if (status.changeShare) {
      projectStore.project = updateProject;
      initPermissions();
      route.meta.type = updateProject.share.public.status
        ? "public"
        : "private";
    }
  });

  return socket.value;
};
