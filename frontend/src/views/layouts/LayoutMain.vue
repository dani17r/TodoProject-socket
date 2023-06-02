<script setup lang="ts">
import broadcastUser from "@services/user";
import { userStore } from "@/stores/user";

import ViewImgProfile from "@modules/user/ViewImgProfile.vue";
import MenuOptions from "@modules/user/MenuOptions.vue";
import Icons from "@components/icons";

import { onUnmounted, onMounted } from "vue";

import { startCase } from "lodash";
import { ref } from "vue";

const menu = ref(false);

const { user } = userStore();
const socket = broadcastUser();

/** Ciclo de vida --------------------*/
onUnmounted(() => socket.close());
onMounted(() => socket.open());
</script>

<template>
  <div class="base content-nav">
    <nav class="flex items-center">
      <ul class="ul-left">
        <li v-show="$route.meta.back">
          <button class="btn-one" @click="$router.push({ name: 'home' })">
            <Icons.Back />
          </button>
        </li>
        <li class="cursor-pointer">
          <h1 class="name">{{ startCase(user?.fullname) }}</h1>
        </li>
      </ul>
      <ul class="ul-right">
        <li>
          <ViewImgProfile @click="menu = true" />
          <MenuOptions :status="menu" @close="menu = false" />
        </li>
      </ul>
    </nav>
  </div>

  <div class="pt-20">
    <RouterView />
  </div>
</template>

<style>
.base .active-link {
  @apply bg-gray-100 text-blue-500 !important;
}

.base.content-nav {
  @apply w-full mb-10 fixed z-50;
}

.base.content-nav nav {
  @apply bg-blue-500 px-4 py-2 dark:bg-blue-900 flex justify-between;
}

.base.content-nav nav .ul-left {
  @apply flex;
}

.base.content-nav nav .ul-right {
  @apply flex justify-end;
}

.base.content-nav nav ul li {
  @apply mr-3;
}

.base.content-nav .name {
  @apply text-lg;
}

.btn-one {
  @apply inline-block rounded-full hover:border-gray-200 hover:text-blue-600 text-white hover:bg-gray-200 py-1 px-1;
}

.btn-two {
  @apply inline-block rounded hover:border-gray-200 hover:text-blue-600 text-white hover:bg-gray-200 py-1 px-2;
}
</style>
