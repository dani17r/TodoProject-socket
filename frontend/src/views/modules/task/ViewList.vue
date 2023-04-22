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

const {
  changePositionTask,
  moveToRecycleBin,
  multiSelect,
  select,
  done,
  modals,
} = taskComposable();
const taskStore = useTaskStore();
const route = useRoute();

const updateTask = computed(() => select.data as FormsI["full"]);
const viewTask = computed(() => select.data as FormsI["full"]);
const tasks = computed(() => taskStore.tasks.data);

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

onUnmounted(() => taskStore.clear());

onMounted(() => {
  taskStore.setProjectId(String(route.params.id));
  taskStore.getAll();
});
</script>

<template>
  <div v-if="tasks.length" class="content-list scrollable">
    <draggable
      v-model="taskStore.tasks.data"
      v-bind="optionsDragg"
      @change="changePositionTask"
    >
      <template #item="{ element: task }">
        <div class="list">
          <div class="flex flex-col w-full" @dblclick="modals.open.view(task)">
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
              <div v-show="!multiSelect.button.value" class="inline-flex gap-1">
                <Icons.Edit
                  v-show="!task.done"
                  class="icon-task-edit"
                  @click="modals.open.update(task)"
                />
                <Icons.Delete
                  class="icon-task-delete"
                  @click="moveToRecycleBin(task._id)"
                />
                <Icons.CircleCheck
                  class="icon-task-check h-8 w-8 -mt-[3px] ml-3"
                  :class="task.done && 'stroke-green-600'"
                  @click="done(task)"
                />
              </div>
              <input
                v-show="multiSelect.button.value"
                :id="task._id"
                v-model="task.select"
                type="checkbox"
                @change="multiSelect.all.selectOne(tasks)"
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
  <Task.ModalView
    :modal="modals.view"
    :view="viewTask"
    @close="modals.toggle('view')"
  />
  <Task.ModalTrash :modal="modals.trash" @close="modals.toggle('trash')" />
</template>

<style>
.content-list {
  overflow-y: scroll;
  max-height: 370px;
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
