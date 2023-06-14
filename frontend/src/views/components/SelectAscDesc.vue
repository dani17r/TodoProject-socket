<script setup lang="ts">
import type { QueryI } from "@interfaces/interfaces.generals";
import icons from "./icons";

const emit = defineEmits(["asc", "desc"]);
const props = defineProps<{ query: QueryI }>();

const sortActive = (val: string) => {
  const className = "!bg-zinc-300 text-zinc-800";
  return props.query.sort.includes(val) && className;
};
</script>

<template>
  <div class="flex">
    <button
      :class="['btn-sort rounded-l-md', sortActive('asc')]"
      @click="emit('asc')"
    >
      <icons.Ascending class="inline" />
      <span class="ml-1">Asc</span>
    </button>
    <button
      :class="['btn-sort rounded-r-md', sortActive('desc')]"
      @click="emit('desc')"
    >
      <icons.Descending class="inline" />
      <span class="ml-1">Desc</span>
    </button>
  </div>
</template>

<style>
.btn-sort {
  @apply py-1 px-2 bg-zinc-700;
}
</style>
