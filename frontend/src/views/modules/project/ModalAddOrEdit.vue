<script setup lang="ts">
import type { FormsI } from "@interfaces/interfaces.project";
import { validationForm } from "@utils/validations";
import useProjectStore from "@stores/project";
import { superForm } from "@utils/inputs";
import useUserStore from "@stores/user";
import Modals from "@components/modals";
import { isEmpty, omit } from "lodash";
import { computed } from "vue";

const events = defineEmits(["close"]);

interface PropsI {
  updated?: FormsI["full"];
  modal: boolean;
}
const props = defineProps<PropsI>();

const projectStore = useProjectStore();
const userStore = useUserStore();

let form = superForm({
  description: "",
  title: "",
});

const { check, errors, setError, clear } = validationForm({
  description: ["empty", "max:80"],
  title: ["empty", "min:3"],
});

const closeModal = () => {
  events("close");
  form.clear();
  clear();
};

const stateModal = computed(() => {
  if (props?.updated) form = superForm(props.updated);
  return props.modal;
});

const updateProject = () => {
  const status = check(omit(form, ["clear"]));
  if (status.value) {
    const newUpdate = omit(form, ["clear"]);
    projectStore.update(newUpdate as FormsI["full"], {
      actions: () => closeModal(),
      error: (err) => setError(err),
    });
  }
};
const createProject = () => {
  const status = check(omit(form, ["clear"]));
  if (status.value) {
    projectStore.create(
      { ...form, _autor: String(userStore.current?._id) },
      {
        actions: () => closeModal(),
        error: (err) => setError(err),
      }
    );
  }
};
</script>

<template>
  <Modals.Main v-model="stateModal" @close="closeModal()">
    <div class="add_edit">
      <h1 class="text-xl">
        {{ isEmpty(props?.updated) ? "New Project" : "Update project" }}
      </h1>
      <div class="content">
        <div>
          <label for="title">Title</label>
          <input
            id="title"
            v-model="form.title"
            :class="['input', errors.title && '!border-red-500']"
            placeholder="Title project"
          />
          <p v-show="errors.title" class="input-error">
            {{ errors.title }}
          </p>
        </div>
        <div class="mb-3">
          <label for="description">Description</label>
          <input
            id="description"
            v-model="form.description"
            :class="['input', errors.description && '!border-red-500']"
            placeholder="Description general project"
          />
          <p v-show="errors.description" class="input-error">
            {{ errors.description }}
          </p>
        </div>
        <button
          class="btn-main"
          @click="isEmpty(props?.updated) ? createProject() : updateProject()"
        >
          {{ isEmpty(props?.updated) ? "Create" : "Update" }}
        </button>
      </div>
    </div>
  </Modals.Main>
</template>

<style>
.add_edit {
  @apply my-5;
}
.add_edit .content {
  @apply flex flex-col gap-5 mt-5;
}
</style>
