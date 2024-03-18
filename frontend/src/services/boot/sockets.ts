import userLocalStorageComposable from "@composables/userLocalStorage";
import { socketBase } from "@services/boot/main";
import { computed } from "vue";

export default () => {
  const { getUserId, getProjectId } = userLocalStorageComposable();

  return {
    socketUser: computed(() =>
      socketBase("/user", { user_id: getUserId.value }),
    ),
    socketAuth: computed(() =>
      socketBase("/auth", { user_id: getUserId.value }),
    ),
    socketProject: computed(() =>
      socketBase("/project", {
        user_id: getUserId.value,
        project_id: getProjectId.value,
      }),
    ),
    socketTask: computed(() =>
      socketBase("/task", {
        project_id: getProjectId.value,
        hola: "hola",
      }),
    ),
  };
};
