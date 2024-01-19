<script setup lang="ts">
import broadcastUser from "@services/user";
import { userStore } from "@/stores/user";

import ViewImgProfile from "@modules/user/ViewImgProfile.vue";
import MenuOptions from "@modules/user/MenuOptions.vue";
import Icons from "@components/icons";

import { onUnmounted, onMounted } from "vue";

import { startCase, truncate } from "lodash";
import { ref } from "vue";

const menu = ref(false);

const { user } = userStore();
const socket = broadcastUser();

/** Ciclo de vida --------------------*/
onUnmounted(() => socket.close());
onMounted(() => socket.open());
</script>

<template>
  <div class="base content-nav !z-[110]">
    <nav class="flex items-center md:!pr-[30px] md:!pl-[35px]">
      <ul class="ul-left">
        <li>
          <button
            class="btn-one"
            :disabled="Boolean(!$route.meta.back)"
            @click="$router.push({ name: 'home' })"
          >
            <Icons.Back />
          </button>
        </li>
        <li class="cursor-pointer">
          <div
            class="flex items-center gap-3"
            @click="
              $router.push({ name: 'profile', params: { id: user?._id } })
            "
          >
            <ViewImgProfile />
            <h1 class="name">{{ truncate(startCase(user?.fullname),{length: 13, omission:''} ) }}</h1>
          </div>
        </li>
      </ul>
      <ul class="ul-right">
        <li class="cursor-pointer">
          <Icons.Menu @click="menu = true" />
          <MenuOptions :status="menu" @close="menu = false" />
        </li>
      </ul>
    </nav>
  </div>
  <div class="content-layout-main">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.content-layout-main {
  @apply px-5 md:px-10 relative;
}

.base .content {
  padding-top: 10px;
}

.base .active-link {
  @apply bg-gray-100 text-blue-500 !important;
}

.base.content-nav {
  @apply w-full top-0 fixed z-50;
}

.base.content-nav nav {
  @apply bg-blue-500 px-4 py-2 dark:bg-blue-900 flex justify-between;
}

.base.content-nav nav .ul-left {
  @apply flex items-center;
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
.btn-one:disabled {
  opacity: 0.3;
}
.btn-one:disabled:hover {
  background-color: transparent;
  color: white;
}
</style>
