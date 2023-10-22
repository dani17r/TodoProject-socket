<script setup lang="ts">
import type { FormsI } from "@interfaces/interfaces.project";
import { validationForm } from "@utils/validations";
import useProjectStore from "@stores/project";
import { superErrors } from "@utils/main";
import { superForm } from "@utils/inputs";
import { userStore } from "@stores/user";
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
const { user } = userStore();

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

const update = () => {
  const status = check(omit(form, ["clear"]));
  if (status.value) {
    const newUpdate = omit(form, ["clear"]);
    projectStore.update(newUpdate as FormsI["full"], {
      actions: () => closeModal(),
      error: (err) => setError(err),
    });
  }
};

const create = () => {
  const status = check(omit(form, ["clear"]));
  if (status.value) {
    projectStore.create(
      { ...form, _author: String(user.value?._id) },
      {
        actions: () => closeModal(),
        error: (err) => setError(err),
      },
    );
  }
};

const inputError = superErrors(errors);
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
            :class="['input capitalize', inputError('title')]"
            placeholder="Title project"
            @keyup.enter="isEmpty(props?.updated) ? create() : update()"
          />
          <p class="input-error">{{ errors.title }}</p>
        </div>

        <div class="mb-3">
          <label for="description">Description</label>
          <input
            id="description"
            v-model="form.description"
            :class="['input', inputError('description')]"
            placeholder="Description general project"
            @keyup.enter="isEmpty(props?.updated) ? create() : update()"
          />
          <p class="input-error">{{ errors.description }}</p>
        </div>
        <button
          class="btn-main"
          @click="isEmpty(props?.updated) ? create() : update()"
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

input:first-letter {
  text-transform: uppercase !important;
}
</style>
