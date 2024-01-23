import userLocalStorageComposable from "@composables/userLocalStorage";
import socketServices from "@services/boot/sockets";
import { userStore } from "@stores/user";
import eventBus from "./boot/eventBus";
import { reactive } from "vue";

export const status = reactive({
  changeShare: true,
  update: true,
});

export default () => {
  const { getUserId } = userLocalStorageComposable();
  const urlSocket = `broadcast:${getUserId.value}`;
  const { refresh, getSharedUser } = userStore();
  const { socketAuth } = socketServices();

  eventBus.on("user/change-share", () => (status.changeShare = false));
  eventBus.on("user/update", () => (status.update = false));

  socketAuth.value.on(`${urlSocket}/update`, () => {
    setTimeout(() => (status.update = true), 300);
    if (status.update) refresh();
  });

  socketAuth.value.on(`${urlSocket}/change-share-user`, () => {
    setTimeout(() => (status.changeShare = true), 300);
    if (status.changeShare) getSharedUser();
  });

  return socketAuth;
};
