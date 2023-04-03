import userLocalStorageComposable from "@composables/userLocalStorage";
import type { StateI } from "@interfaces/interfaces.project";
import useProjectStore from "@stores/project";
import { socketBase } from "@services/main";
import { computed } from "vue";

const { getUserId } = userLocalStorageComposable();

export default () => {
  const socket = computed(() => socketBase("/project", getUserId.value));

  socket.value.timeout(8000).on(`broadcast:${getUserId.value}/create`, () => {
    const projectStore = useProjectStore();
    projectStore.getAll();
  });

  socket.value.timeout(8000).on(`broadcast:${getUserId.value}/update`, () => {
    const projectStore = useProjectStore();
    projectStore.getAll();
  });

  socket.value
    .timeout(8000)
    .on(
      `broadcast:${getUserId.value}/delete`,
      ({ _id, projects }: { _id: string; projects: StateI["projects"] }) => {
        const projectStore = useProjectStore();
        document.getElementById(`modal_add_or_edit-${_id}`)?.click();
        document.getElementById(`dropdown_blur-${_id}`)?.click();
        document.getElementById(`modal_confirm-${_id}`)?.click();
        projectStore.removeAndPreviePaginate(projects);
      }
    );

  return socket.value;
};
