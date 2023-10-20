<script setup lang="ts">
// project libraries
import broadcastProject from "@services/projects";
import Project from "@modules/project";
import Icon from "@components/icons";

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
    <!-- <h1 class="name-project">Projects</h1> -->
    <Suspense>
      <Project.Options />
    </Suspense>
     <Suspense>
      <template #fallback>
        <Transition name="fade">
          <div class="fixed left-0 z-50 w-full h-[77.5vh] flex justify-center items-center">
            <Icon.Loading/>
          </div>
        </Transition>
      </template>
      <Project.List />
    </Suspense>

    <Suspense>
      <Project.Paginate />
    </Suspense>
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
