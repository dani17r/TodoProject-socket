<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: "" },
});
const emit = defineEmits(["update:modelValue"]);

const status = computed({
  get: () => props.modelValue || false,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input v-model="status" type="checkbox" class="sr-only peer" />
    <div
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
    ></div>
    <span class="ml-3 dark:text-gray-300">{{ props.title }}</span>
  </label>
</template>
