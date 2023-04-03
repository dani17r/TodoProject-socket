<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import draggable from "vuedraggable";
import { truncate } from "lodash";

import type { FormsI } from "@interfaces/interfaces.task";
import taskComposable from "@composables/task";
import useTaskStore from "@stores/task";
import Icons from "@components/icons";
import Task from "@modules/task";

const route = useRoute();
const taskStore = useTaskStore();
const {
  changePositionTask,
  openUpdateTask,
  selectOneTask,
  multiSelect,
  selectTask,
  deleteTask,
  doneTask,
  modals,
} = taskComposable();

onMounted(() => {
  taskStore.setProjectId(String(route.params.id));
  taskStore.getAll();
});
onUnmounted(() => taskStore.clear());

const updateTask = computed(() => selectTask.value as FormsI["full"]);

let optionsDragg = {
  componentData: {
    type: "transition-group",
    name: "list",
  },
  preventOnFilter: false,
  group: "description",
  ghostClass: "ghost",
  dragClass: "drag",
  disabled: false,
  animation: 200,
  itemKey: "_id",
};
</script>

<template>
  <div v-if="taskStore.tasks.data" class="content-list">
    <draggable
      v-model="taskStore.tasks.data"
      v-bind="optionsDragg"
      @change="changePositionTask"
    >
      <template #item="{ element: task }">
        <div class="list">
          <div class="flex flex-col w-full">
            <div class="w-full inline-flex justify-between">
              <div class="inline-flex gap-4">
                <h2
                  class="text-zinc-200 font-bold text-lg"
                  :class="
                    task.done && 'opacity-50 line-through !text-green-600'
                  "
                >
                  {{ truncate(task.name, { length: 28 }) }}
                </h2>
              </div>
              <div v-show="!multiSelect" class="inline-flex gap-1">
                <Icons.Edit
                  v-show="!task.done"
                  class="icon-task-edit"
                  @click="openUpdateTask(task)"
                />
                <Icons.Delete
                  class="icon-task-delete"
                  @click="deleteTask(task._id)"
                />
                <Icons.CircleCheck
                  class="icon-task-check h-8 w-8 -mt-[3px] ml-3"
                  :class="task.done && 'stroke-green-600'"
                  @click="doneTask(task)"
                />
              </div>
              <input
                v-show="multiSelect"
                :id="task._id"
                v-model="task.select"
                type="checkbox"
                @change="selectOneTask()"
              />
            </div>
            <div
              class="ql-container ql-disabled ql-snow !bg-transparent"
              :class="task.done && 'opacity-50 line-through'"
            >
              <div
                class="ql-editor ql-blank"
                v-html="truncate(task.content, { length: 80 })"
              ></div>
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </div>

  <button
    class="fixed bottom-3 left-3 z-50 bg-blue-600 p-2 rounded-full"
    @click="modals.toggle('trash')"
  >
    <Icons.Delete />
  </button>

  <Task.ModalEdit
    :modal="modals.edite"
    :updated="updateTask"
    @close="modals.toggle('edite')"
  />
  <Task.ModalTrash :modal="modals.trash" @close="modals.toggle('trash')" />
</template>

<style>
.content-list {
  @apply flex flex-col gap-4 mt-8;
}
.list {
  @apply flex gap-4 p-3 cursor-pointer;
}
.icon-task-edit {
  @apply hover:stroke-blue-300;
}
.icon-task-check {
  @apply hover:stroke-green-500;
}
.icon-task-delete {
  @apply hover:stroke-red-400;
}
.ghost {
  @apply bg-blue-500 rounded-lg;
}
.drag {
  opacity: 0;
}
</style>
