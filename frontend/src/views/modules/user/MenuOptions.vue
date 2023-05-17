<script setup lang="ts">
import notifyComposable from "@composables/notify";
import Confirm from "@components/modals/ModalConfirm.vue";

import { superModals } from "@utils/inputs";
import { userStore } from "@/stores/user";
import { useRouter } from "vue-router";
import Icons from "@components/icons";

const { user, logout } = userStore();

const emit = defineEmits(["close"]);
const props = defineProps({
  status: Boolean,
});

const Notify = notifyComposable();
const router = useRouter();

const modals = superModals({
  confirm: false,
});

const logOut = () => {
  logout({
    actions: (notify) => {
      setTimeout(() => router.push({ name: "login" }), 300);
      Notify.success(String(notify?.message));
    },
    error: (error) => Notify.error(error.message),
  });
};
</script>

<template>
  <div
    v-show="props.status"
    class="fixed top-0 left-0 w-full h-[100vh] z-30"
    @click="emit('close')"
  ></div>
  <div
    v-show="props.status"
    class="absolute top-14 right-5 transition-all z-50"
  >
    <div class="bg-zinc-700 w-[140px] py-1 rounded-md">
      <RouterLink :to="{ name: 'profile', params: { id: user?._id } }">
        <button class="btn-two w-full" @click="emit('close')">
          <Icons.Profile />
          Profile
        </button>
      </RouterLink>
      <button
        class="btn-two w-full"
        @click="modals.toggle('confirm'), emit('close')"
      >
        <Icons.Logout />
        Logout
      </button>
    </div>
  </div>

  <Confirm
    v-model="modals.confirm"
    message="Are you sure to close the session ?"
    @close="modals.toggle('confirm')"
    @confirm="logOut()"
  />
</template>
