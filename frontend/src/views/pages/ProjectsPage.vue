<script setup lang="ts">
// project libraries
import broadcastProject from "@services/projects";
import Project from "@modules/project";

// internal libraries
import { onUnmounted, onMounted } from "vue";

// Instancias
const socket = broadcastProject();

/** Ciclo de vida --------------------*/
onUnmounted(() => socket.close());
onMounted(() => socket.open());
</script>

<template>
  <div class="content-project">
    <Project.Options />
    <Project.List />
    <Project.Paginate />
  </div>
</template>

<style>
.content-project {
  @apply px-10 pt-20 relative;
}
.name-project {
  @apply text-zinc-300 text-4xl mb-5;
}
</style>
