<script setup lang="ts">
// project libraries
import broadcastProject from "@services/projects";
import Project from "@modules/project";

// Instancias
broadcastProject();
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
  @apply pt-20 relative;
}
.name-project {
  @apply text-zinc-300 text-4xl mb-5;
}
</style>
