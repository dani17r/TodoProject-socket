<script setup lang="ts">
import SelectAscDesc from "@components/SelectAscDesc.vue";
import { validationForm } from "@utils/validations";
import shareComposable from "@composables/share";
import { projectStore } from "@stores/project";
import taskComposable from "@composables/task";
import { superErrors } from "@utils/main";
import useTaskStore from "@stores/task";
import Icons from "@components/icons";
import Popper from "vue3-popper";
import { computed } from "vue";

const taskStore = useTaskStore();
const { project } = projectStore();

const {
  moveSelectToRecycleBin,
  ascDesc,
  create,

  multiSelect,
  query,
  form,
} = taskComposable();

const { check, errors } = validationForm({ nameTask: ["empty"] });
const { allowIfPermission, permissions } = shareComposable();
const tasks = computed(() => taskStore.tasks.data);

const addNewTask = () => {
  const status = check({ nameTask: form.name });
  if (status.value) create();
};

const inputError = superErrors(errors);
</script>

<template>
  <h1 class="text-grey-darkest mt-16">
    <i class="text-sm font-sans">Project: </i>
    <br />
    <span class="text-2xl font-bold">{{ project?.title }}</span>
  </h1>

  <Popper
    class="w-full !m-0 !border-0"
    content="You don't have allow for created"
    :disabled="permissions.c"
  >
    <div class="flex mt-4">
      <input
        v-model="form.name"
        :class="['input py-2 px-3 mr-4', inputError('nameTask')]"
        placeholder="New task"
        @keyup.enter="allowIfPermission('u', () => addNewTask())"
      />
      <button
        class="btn-main !w-auto flex items-center md:uppercase !rounded-full md:!rounded-md"
        @click="allowIfPermission('c', () => addNewTask())"
      >
        <Icons.Plus class="inline" />
        <span class="ml-1 mr-2 hidden md:block"> Add </span>
      </button>
    </div>
  </Popper>

  <div v-if="tasks.length" class="flex mt-5 justify-between items-center">
    <SelectAscDesc
      v-show="!multiSelect.button.value"
      class="flex items-center h-6"
      :query="query"
      @asc="ascDesc('asc')"
      @desc="ascDesc('desc')"
    />

    <div v-show="multiSelect.button.value" class="flex gap-3 items-center">
      <button
        v-show="multiSelect.button.value"
        class="btn-two !flex !bg-red-600"
        @click="multiSelect.button.toggle()"
      >
        <Icons.Close class="inline mt-[2px]" />
        <span class="ml-1 mr-2">Cancel</span>
      </button>

      <Popper
        class="w-full !m-0 !border-0"
        content="You don't have allow for removed"
        :disabled="permissions.r"
      >
        <Icons.Delete
          v-show="multiSelect.all.value.length"
          class="icon-task-delete"
          @click="allowIfPermission('r', () => moveSelectToRecycleBin())"
        />
      </Popper>
    </div>

    <div
      :class="[
        'flex items-center gap-3',
        multiSelect.button.value ? 'pr-[18px]' : '',
      ]"
    >
      <button
        v-show="!multiSelect.button.value"
        class="btn-two flex justify-center items-center"
        @click="multiSelect.button.toggle()"
      >
        <Icons.Select class="inline -mt-1" />
        <span class="ml-1 mr-2"> Selection </span>
      </button>

      <input
        v-show="multiSelect.button.value"
        v-model="multiSelect.all.status"
        type="checkbox"
        @change="multiSelect.all.selectAll(tasks)"
      />
    </div>
  </div>
</template>
