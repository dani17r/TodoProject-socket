<script setup lang="ts">
import { userStore } from "@stores/user";
import { computed } from "vue";

const { user } = userStore();

const preview = computed(
  () => `${import.meta.env.VITE_URL_UPLOAD}/${user.value?.image}`,
);
</script>

<template>
  <img :src="preview" class="image-mini-profile" />
</template>

<style>
.image-mini-profile {
  @apply w-[40px] h-[40px] rounded-full object-cover;
}
</style>
