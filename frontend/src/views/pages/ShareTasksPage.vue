<script setup lang="ts">
// project libraries
import shareComposable from "@composables/share";
import broadcastShared from "@services/share";
import Task from "@modules/task";
import { onMounted } from "vue";

// internal libraries
const { initPermissions, isOwner } = shareComposable();

// Instancias
broadcastShared();

/** Ciclo de vida --------------------*/
onMounted(() => {
  initPermissions();
});
</script>

<template>
  <Task.Content>
    <Task.MenuShare v-if="isOwner" />
    <Task.Options />
    <Task.List />
  </Task.Content>
</template>
