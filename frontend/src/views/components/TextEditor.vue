<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
</script>

<template>
  <QuillEditor content-type="html" toolbar="minimal" v-bind="$props" />
</template>

<style>
.ql-container.ql-snow {
  @apply bg-zinc-700 border-none rounded;
}

.ql-toolbar.ql-snow {
  @apply border-none;
}

.ql-snow .ql-fill {
  @apply fill-zinc-100;
}

.ql-snow .ql-stroke {
  @apply stroke-zinc-100;
}

.ql-editor.ql-blank::before {
  @apply text-zinc-500;
}
</style>
