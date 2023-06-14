<script setup lang="ts">
import Icons from "@components/icons";
import { computed } from "vue";

const emit = defineEmits(["update:modelValue", "accept", "clear", "change"]);
const props = defineProps({
  modelValue: { type: String, default: "" },
  classContent: { type: String, default: "" },
});

const status = computed({
  get: () => String(props.modelValue),
  set: (value) => {
    emit("update:modelValue", value);
    emit("change");
  },
});
</script>

<template>
  <div class="flex">
    <div :class="`search ${props.classContent}`">
      <input
        v-model="status"
        :placeholder="String($attrs.placeholder)"
        class="input"
        @keydown.enter="emit('accept')"
      />
      <Icons.Close
        v-show="status.length > 0"
        class="icon-clear"
        @click="[emit('clear'), emit('accept')]"
      />
    </div>
    <button class="btn-input-search-accept" @click="emit('accept')">
      <Icons.Search class="inline" />
    </button>
  </div>
</template>

<style>
.btn-input-search-accept {
  @apply bg-zinc-200 rounded-r-lg px-3 text-zinc-900 w-12 h-[42px];
}
.search {
  @apply relative;
}

.icon-clear {
  @apply absolute !top-[12px] !right-3;
}

.search .input {
  @apply !rounded-r-none !pr-10 pb-3;
}
</style>
