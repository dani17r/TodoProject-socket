<script setup lang="ts">
import shareComposable from "@composables/share";

const { isGuest, isOwner } = shareComposable();
</script>

<template>
  <div class="w-full flex items-center justify-center">
    <div v-if="$route.meta.error" class="text-center mt-[30vh]">
      <h1 class="text-4xl mb-6">Sorry the id is wrong</h1>
      <p class="font-bold mb-2">
        Verify that you wrote the id address correctly
      </p>
      <span class="text-sm">{{ $route.params.id }}</span>
    </div>

    <div
      v-else-if="$route.meta.type == 'private' && !isGuest && !isOwner"
      class="text-center mt-[30vh]"
    >
      <h1 class="text-4xl mb-6">You don't have permissions</h1>
      <p class="font-bold mb-2">Access to this board is not allowed</p>
    </div>

    <div v-else class="bg-zinc-300 dark:bg-zinc-800 rounded p-6 w-3/5">
      <slot />
    </div>
  </div>
</template>
