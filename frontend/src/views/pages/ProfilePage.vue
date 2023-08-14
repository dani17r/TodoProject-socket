<script setup lang="ts">
import { userStore } from "@stores/user";
import dayjs from "dayjs";

import FormProfilePass from "@modules/user/FormProfilePass.vue";
import FormProfileUser from "@modules/user/FormProfileUser.vue";

const fmtUserCreateAt = "dddd DD, MMMM MM, YYYY - h:m A";
const { user } = userStore();
</script>

<template>
  <div class="flex justify-center pt-20">
    <span v-if="user" class="absolute top-16 right-5 text-sm"
      >Created: {{ dayjs(user.createdAt).format(fmtUserCreateAt) }}</span
    >
    <div class="grid md:grid-cols-2 gap-10">
      <FormProfileUser />
      <FormProfilePass />
    </div>
  </div>
</template>

<style>
.content-profile {
  @apply flex flex-col items-center justify-center gap-6 mt-7;
}
.box-field {
  @apply block w-full max-w-md;
}
</style>
