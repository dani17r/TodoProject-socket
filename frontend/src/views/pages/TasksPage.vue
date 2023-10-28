<script setup lang="ts">
// project libraries
import shareComposable from "@composables/share";
import { onUnmounted, onMounted } from "vue";
import broadcastTask from "@services/tasks";
import { useRoute } from "vue-router";
import Task from "@modules/task";

// internal libraries
const { initPermissions } = shareComposable();
const route = useRoute();

// Instancias
const socket = broadcastTask(String(route.params.id));

/** Ciclo de vida --------------------*/
onUnmounted(() => socket.close());
onMounted(() => {
  initPermissions();
  socket.open();
});
</script>

<template>
  <Task.Content>
    <Task.MenuShare />
    <Task.Options />
    <Task.List />
  </Task.Content>
</template>
