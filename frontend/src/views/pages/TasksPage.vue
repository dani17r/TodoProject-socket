<script setup lang="ts">
// project libraries
import shareComposable from "@composables/share";
import { onMounted } from "vue";
import broadcastTask from "@services/tasks";
import Task from "@modules/task";

// internal libraries
const { initPermissions } = shareComposable();

// Instancias
broadcastTask();

/** Ciclo de vida --------------------*/
onMounted(() => {
  initPermissions();
});
</script>

<template>
  <Task.Content>
    <Task.MenuShare />
    <Task.Options />
    <Task.List />
  </Task.Content>
</template>
