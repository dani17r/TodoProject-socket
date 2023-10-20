import userLocalStorageComposable from "@composables/userLocalStorage";
// import useProjectStore from "@stores/project";
import { socketBase } from "@services/main";
import { computed, reactive } from "vue";
import { userStore } from "@stores/user";
import eventBus from "./eventBus";

export const status = reactive({
  changeShare: true,
  update: true,
});

export default () => {
  const { getUserId } = userLocalStorageComposable();
  const urlSocket = `broadcast:${getUserId.value}`;
  // const projectStore = useProjectStore();
  const { refresh } = userStore();

  eventBus.on("user/update", () => (status.update = false));

  const socket = computed(() => socketBase("/auth", getUserId.value));

  socket.value.on(`${urlSocket}/update`, async () => {
    setTimeout(() => (status.update = true), 300);
    if (status.update) await refresh();
  });

  // socket.value.on(`broadcast:${projectId}/change-share`, (updateProject) => {
  //   setTimeout(() => (status.changeShare = true), 300);
  //   if (status.changeShare) {
  //     projectStore.getShared();
  //   }
  // });

  return socket.value;
};
