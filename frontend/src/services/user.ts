import userLocalStorageComposable from "@composables/userLocalStorage";
import { socketBase } from "@services/main";
import { computed, reactive } from "vue";
import { userStore } from "@stores/user";
import eventBus from "./eventBus";

export const status = reactive({
  update: true,
});

export default () => {
  const { getUserId } = userLocalStorageComposable();
  const urlSocket = `broadcast:${getUserId.value}`;
  const { refresh } = userStore();

  eventBus.on("user/update", () => (status.update = false));

  const socket = computed(() => socketBase("/auth", getUserId.value));

  socket.value.on(`${urlSocket}/update`, () => {
    setTimeout(() => (status.update = true), 300);
    if (status.update) refresh();
  });

  return socket.value;
};
