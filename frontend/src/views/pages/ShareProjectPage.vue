<script setup lang="ts">
// project libraries
import shareComposable from "@composables/share";
import { onUnmounted, onMounted } from "vue";
import broadcastTask from "@services/share";
import Project from "@modules/project";
import { useRoute } from "vue-router";
import Task from "@modules/task";

// internal libraries
const { initPermissions, isOwner } = shareComposable();
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
    <Project.MenuShare v-if="isOwner" />
    <Task.Options />
    <Task.List />
  </Task.Content>
</template>
