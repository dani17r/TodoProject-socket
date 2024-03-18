<script setup lang="ts">
import { userStore } from "@stores/user";
import dayjs from "dayjs";

import User from "@modules/user";

const fmtUserCreateAt = "dddd DD, MMMM MM, YYYY - h:m A";
const { user } = userStore();
</script>

<template>
  <div class="flex justify-center pt-20">
    <span v-if="user" class="absolute top-16 md:right-5 text-[12px] md:text-sm"
      >Created: {{ dayjs(user.createdAt).format(fmtUserCreateAt) }}</span
    >
    <div class="grid md:grid-cols-2 gap-10">
      <User.FormProfile />
      <User.FormProfilePass />
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
