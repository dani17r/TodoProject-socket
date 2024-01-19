<script setup lang="ts">
import shareComposable from "@composables/share";

const { isGuest, isOwner } = shareComposable();
</script>

<template>
  <div class="w-full md:flex items-center justify-center">
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

    <div v-else class="pt-6 md:p-6 md:w-3/5 mx-auto max-w-[550px] md:min-w-[550px]">
      <slot />
    </div>
  </div>
</template>
