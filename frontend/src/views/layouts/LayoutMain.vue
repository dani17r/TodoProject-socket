<script setup lang="ts">
import notifyComposable from "@composables/notify";
import { superModals } from "@utils/inputs";
import userStore from "@/stores/user";

import Confirm from "@components/modals/ModalConfirm.vue";
import Icons from "@components/icons";

import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { startCase } from "lodash";

const Notify = notifyComposable();
const useUserState = userStore();
const router = useRouter();

const { current } = storeToRefs(useUserState);

const modals = superModals({
  confirm: false,
});

const logout = () => {
  useUserState.logout({
    actions: (notify) => {
      setTimeout(() => router.push({ name: "login" }), 300);
      Notify.success(notify.message);
    },
    error: (error) => Notify.error(error.message),
  });
};
</script>
<template>
  <div class="base content-nav">
    <nav>
      <ul class="ul-left">
        <li v-show="$route.meta.back">
          <button class="btn-one" @click="$router.push({ name: 'home' })">
            <Icons.Back />
          </button>
        </li>
        <li>
          <h1 class="name">{{ startCase(current?.fullname) }}</h1>
        </li>
      </ul>
      <ul class="ul-right">
        <li>
          <button class="btn-two" @click="modals.toggle('confirm')">
            <Icons.Logout />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </div>

  <Confirm
    v-model="modals.confirm"
    message="Are you sure to close the session ?"
    @close="modals.toggle('confirm')"
    @confirm="logout()"
  />

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
  @apply text-lg mt-[1px];
}

.btn-one {
  @apply inline-block rounded-full hover:border-gray-200 hover:text-blue-600 text-white hover:bg-gray-200 py-1 px-1;
}

.btn-two {
  @apply inline-block rounded hover:border-gray-200 hover:text-blue-600 text-white hover:bg-gray-200 py-1 px-2;
}
</style>
