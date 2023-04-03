import userLocalStorageComposable from "@composables/userLocalStorage";
// import type { StateI } from "@/types/interfaces.task";
import { socketBase } from "@services/main";
// import useTaskStore from "@stores/task";
import { computed } from "vue";

const { getUserId } = userLocalStorageComposable();

export default () => {
  const socket = computed(() => socketBase("/task", getUserId.value));

  socket.value.timeout(8000).on(`broadcast:${getUserId.value}/create`, () => {
    // const taskStore = useTaskStore();
    // taskStore.getAll();
  });

  socket.value.timeout(8000).on(`broadcast:${getUserId.value}/update`, () => {
    // const taskStore = useTaskStore();
    // taskStore.getAll();
  });

  // socket.value
  //   .timeout(8000)
  //   .on(
  //     `broadcast:${getUserId.value}/delete`,
  //     ({ _id, tasks }: { _id: string; tasks: StateI["tasks"] }) => {
  //       // const taskStore = useTaskStore();
  //       // taskStore.removeAndPreviePaginate(tasks);
  //     }
  //   );

  return socket.value;
};
