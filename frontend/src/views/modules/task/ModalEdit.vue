<script setup lang="ts">
import type { FormsI } from "@interfaces/interfaces.task";
import { validationForm } from "@utils/validations";
import TextEditor from "@components/TextEditor.vue";
import DOMPurify from "isomorphic-dompurify";
import { superForm } from "@utils/inputs";
import useTaskStore from "@stores/task";
import Modals from "@components/modals";
import { computed } from "vue";
import { omit } from "lodash";

const events = defineEmits(["close"]);

interface PropsI {
  updated?: FormsI["full"];
  modal: boolean;
}
const props = defineProps<PropsI>();

const taskStore = useTaskStore();

let form = superForm({
  content: "",
  name: "",
});

const { check, errors, setError, clear } = validationForm({
  name: ["empty", "min:3"],
});

const closeModal = () => {
  events("close");
  form.clear();
  clear();
};

const stateModal = computed(() => {
  if (props.updated) form = superForm(props.updated);
  return props.modal;
});

const updateTask = () => {
  const status = check(omit(form, ["clear"]));
  if (status.value) {
    let newUpdate = omit(form, ["clear"]);
    newUpdate.content = DOMPurify.sanitize(form.content);

    taskStore.update(newUpdate as FormsI["full"], {
      actions: () => closeModal(),
      error: (err) => setError(err),
    });
  }
};
</script>

<template>
  <Modals.Main v-model="stateModal" @close="closeModal()">
    <div class="add_edit">
      <h1 class="text-xl">Update task</h1>
      <div class="content">
        <div>
          <label for="title">name</label>
          <input
            id="title"
            v-model="form.name"
            :class="['input', errors.name && '!border-red-500']"
            placeholder="Title task"
          />
          <p v-show="errors.name" class="input-error">
            {{ errors.name }}
          </p>
        </div>
        <div class="mb-3">
          <label for="description">Content</label>
          <TextEditor
            v-model:content="form.content"
            theme="snow"
            placeholder="Content an epic..."
          />
        </div>
        <button class="btn-main" @click="updateTask()">Update</button>
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
.ql-editor {
  overflow-y: overlay;
  max-height: 180px;
}
</style>
