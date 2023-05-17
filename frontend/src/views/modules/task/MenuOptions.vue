<script setup lang="ts">
import { validationForm } from "@utils/validations";
import taskComposable from "@composables/task";
import { superErrors } from "@utils/main";
import useTaskStore from "@stores/task";
import Icons from "@components/icons";
import { computed } from "vue";

const taskStore = useTaskStore();

const { moveSelectToRecycleBin, multiSelect, ascDesc, create, query, form } =
  taskComposable();

const { check, errors } = validationForm({ nameTask: ["empty"] });

const addNewTask = () => {
  const status = check({ nameTask: form.name });
  if (status.value) create();
};
const tasks = computed(() => taskStore.tasks.data);

const sortActive = (val: string) =>
  query.value.sort.includes(val) && "bg-zinc-300 text-zinc-800";

const inputError = superErrors(errors);
</script>

<template>
  <div>
    <h1 class="text-grey-darkest">Tasks</h1>
    <div class="flex mt-4">
      <input
        v-model="form.name"
        :class="['input py-2 px-3 mr-4', inputError('nameTask')]"
        placeholder="New task"
      />
      <button
        class="p-2 rounded bg-blue-500 text-zinc-100 hover:text-zinc-300 hover:bg-blue-600"
        @click="addNewTask()"
      >
        Add
      </button>
    </div>
    <div v-if="tasks.length" class="flex mt-5 justify-between items-center">
      <div
        v-show="!multiSelect.button.value"
        class="flex items-center h-6 pl-2"
      >
        <button
          :class="['btn-sort rounded-l-md', sortActive('asc')]"
          @click="ascDesc('asc')"
        >
          Asc
        </button>
        <button
          :class="['btn-sort rounded-r-md', sortActive('desc')]"
          @click="ascDesc('desc')"
        >
          Desc
        </button>
      </div>

      <div v-show="multiSelect.button.value" class="flex gap-3 pl-2">
        <button
          v-show="multiSelect.button.value"
          class="px-2 border border-zinc-300 rounded text-zinc-200"
          @click="multiSelect.button.toggle()"
        >
          Cancel
        </button>
        <Icons.Delete
          v-show="multiSelect.all.value.length"
          class="icon-task-delete"
          @click="moveSelectToRecycleBin()"
        />
      </div>

      <div
        :class="[
          'flex items-center gap-3',
          multiSelect.button.value ? 'pr-[18px]' : 'pr-1',
        ]"
      >
        <button
          v-show="!multiSelect.button.value"
          class="px-2 border border-zinc-400 rounded"
          @click="multiSelect.button.toggle()"
        >
          MultiSelect
        </button>

        <input
          v-show="multiSelect.button.value"
          v-model="multiSelect.all.status"
          type="checkbox"
          @change="multiSelect.all.selectAll(tasks)"
        />
      </div>
    </div>
  </div>
</template>

<style>
.btn-sort {
  @apply px-2 border border-zinc-400;
}
</style>
