<script setup lang="ts">
import Confirm from "@components/modals/ModalConfirm.vue";
import { superModals } from "@utils/inputs";
import Modals from "@components/modals";
import useTaskStore from "@stores/task";
import Icons from "@components/icons";
import { truncate } from "lodash";
import { computed } from "vue";

const events = defineEmits(["close"]);
const props = defineProps<{ modal: boolean }>();

const stateModal = computed(() => props.modal);

const modals = superModals({ confirm: false });

const taskStore = useTaskStore();

const deleteTask = (_id: string) => taskStore.remove(_id);

const deleteAllTrash = () => taskStore.removeAll();
</script>

<template>
  <Modals.Main
    v-model="stateModal"
    class-content="flex justify-center items-end"
    class="content-modal !px-0"
    transition="modal"
    @close="events('close')"
  >
    <div class="header-trash">
      <div class="flex justify-between">
        <h1 class="flex items-center gap-3">
          <Icons.Delete class="inline" /> <span class="text-xl">Trash</span>
        </h1>
        <button
          v-show="taskStore.tasks.trash.length"
          class="btn-remove-all"
          @click="modals.toggle('confirm')"
        >
          <span class="mr-2">Remove all</span>
          <Icons.Close class="icon-task-delete" />
        </button>
      </div>
    </div>
    <div class="content-trash px-6">
      <div class="content-list">
        <div v-for="(task, i) in taskStore.tasks.trash" :key="i" class="list">
          <div class="flex flex-col w-full">
            <div class="w-full inline-flex justify-between">
              <div class="inline-flex gap-4">
                <h2 class="text-zinc-200 font-bold text-lg">
                  {{ truncate(task.name, { length: 60 }) }}
                </h2>
              </div>
              <div class="inline-flex">
                <Icons.Close
                  class="icon-task-delete"
                  @click="deleteTask(task._id)"
                />
              </div>
            </div>
            <div v-show="task.content != ''" class="ql-container ql-disabled">
              <div
                class="ql-editor ql-blank"
                v-html="truncate(task.content, { length: 80 })"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modals.Main>

  <Confirm
    v-model="modals.confirm"
    message="Are you sure to delete all ?"
    class="!z-[200]"
    @close="modals.toggle('confirm')"
    @confirm="deleteAllTrash()"
  />
</template>

<style>
.content-modal {
  @apply !w-[600px] h-[570px];
}
.content-trash {
  @apply overflow-y-scroll w-full h-[570px];
}
.content-trash {
  scrollbar-width: thin;
  scrollbar-color: rgb(30, 58, 138) rgba(255, 255, 255, 0);
}
.content-trash::-webkit-scrollbar {
  width: 5px;
}

.content-trash::-webkit-scrollbar-track {
  background: rgb(30, 58, 138) rgba(255, 255, 255, 0);
}
.btn-remove-all {
  @apply border border-red-500 text-red-500 px-2 flex items-center rounded-md hover:border-red-400 hover:text-red-400;
}
.content-trash::-webkit-scrollbar-thumb {
  background-color: rgb(30, 58, 138);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0);
}
.header-trash {
  @apply sticky bg-zinc-800 px-5 pb-4 border-b border-zinc-400 w-full;
}
</style>
