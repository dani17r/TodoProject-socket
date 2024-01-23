import userLocalStorageComposable from "@composables/userLocalStorage";
import type { StateI } from "@interfaces/interfaces.project";
import socketServices from "@services/boot/sockets";
import useProjectStore from "@stores/project";
import eventBus from "@services/boot/eventBus";
import { reactive } from "vue";

const status = reactive({
  create: true,
  update: true,
  delete: true,
});

export default () => {
  const { getUserId } = userLocalStorageComposable();
  const urlSocket = `broadcast:${getUserId.value}`;
  const { socketProject } = socketServices();
  const projectStore = useProjectStore();

  eventBus.on("project/update", () => (status.update = false));
  eventBus.on("project/create", () => (status.create = false));
  eventBus.on("project/delete", () => (status.delete = false));

  socketProject.value.on(`${urlSocket}/create`, () => {
    setTimeout(() => (status.create = true), 300);
    if (status.create) projectStore.getAll();
  });

  socketProject.value.on(`${urlSocket}/update`, () => {
    setTimeout(() => (status.update = true), 300);
    if (status.update) projectStore.getAll();
  });

  socketProject.value.on(
    `${urlSocket}/delete`,
    ({ _id, projects }: { _id: string; projects: StateI["projects"] }) => {
      setTimeout(() => (status.delete = true), 300);
      if (status.delete) {
        document.getElementById(`modal_add_or_edit-${_id}`)?.click();
        document.getElementById(`dropdown_blur-${_id}`)?.click();
        document.getElementById(`modal_confirm-${_id}`)?.click();
        projectStore.removeAndPreviePaginate(projects);
      }
    },
  );

  return socketProject;
};
