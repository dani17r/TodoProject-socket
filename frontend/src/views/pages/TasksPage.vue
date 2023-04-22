<script setup lang="ts">
// project libraries
import broadcastTask from "@services/tasks";
import Task from "@modules/task";

// internal libraries
import { onUnmounted, onMounted } from "vue";

// Instancias
const socket = broadcastTask();

/** Ciclo de vida --------------------*/
onUnmounted(() => socket.close());
onMounted(() => socket.open());
</script>

<template>
  <Task.Content>
    <Task.Options />
    <Task.List />
  </Task.Content>
</template>
