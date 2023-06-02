<script setup lang="ts">
import Confirm from "@components/modals/ModalConfirm.vue";
import shareComposable from "@composables/share";
import { superModals } from "@utils/inputs";
import Modals from "@components/modals";
import useTaskStore from "@stores/task";
import Icons from "@components/icons";
import { truncate } from "lodash";
import Popper from "vue3-popper";
import { computed } from "vue";

const events = defineEmits(["close"]);
const props = defineProps<{ modal: boolean }>();

const { permissions, allowIfPermission } = shareComposable();

const stateModal = computed(() => props.modal);

const modals = superModals({ confirm: false });

const taskStore = useTaskStore();

const deleteTask = (_id: string) => taskStore.remove(_id);

const deleteAllTrash = () => {
  modals.toggle("confirm");
  taskStore.removeAll();
};
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

        <Popper
          content="You don't have allow for removed all"
          :disabled="permissions.d"
        >
          <button
            v-show="taskStore.tasks.trash.length"
            class="btn-remove-all"
            @click="allowIfPermission('d', () => modals.toggle('confirm'))"
          >
            <span class="mr-2">Remove all</span>
            <Icons.Close class="icon-task-delete" />
          </button>
        </Popper>
      </div>
    </div>
    <div class="content-trash px-6">
      <div class="content-list !min-h-[450px] scrollable">
        <div v-for="(task, i) in taskStore.tasks.trash" :key="i" class="list">
          <div class="flex flex-col w-full">
            <div class="w-full inline-flex justify-between">
              <div class="inline-flex gap-4">
                <h2 class="text-zinc-200 font-bold text-lg">
                  {{ truncate(task.name, { length: 60 }) }}
                </h2>
              </div>
              <div class="inline-flex">
                <Popper
                  content="You don't have allow for removed all"
                  :disabled="permissions.d"
                >
                  <Icons.Close
                    class="icon-task-delete"
                    @click="allowIfPermission('d', () => deleteTask(task._id))"
                  />
                </Popper>
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
.btn-remove-all {
  @apply border border-red-500 text-red-500 px-2 flex items-center rounded-md hover:border-red-400 hover:text-red-400;
}
.header-trash {
  @apply sticky bg-zinc-800 px-5 pb-4 border-b border-zinc-400 w-full;
}
</style>
