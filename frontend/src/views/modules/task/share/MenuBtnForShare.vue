<script setup lang="ts">
import Dropdown from "@components/MenuDropdown.vue";
import shareComposable from "@composables/share";
import { superModals } from "@utils/inputs";
import { userStore } from "@stores/user";
import Icons from "@components/icons";
import Tasks from "@modules/task";

// project libraries
const { restarOrInitSharePrivate, restarOrInitSharePublic } = shareComposable();
const { restartUsers } = userStore();

const modal = superModals({
  sharePrivate: false,
  sharePublic: false,
  dropdown: false,
});

const closeModalPrivateShare = () => {
  modal.toggle("sharePrivate");
  restarOrInitSharePrivate();
  restartUsers();
};

const closeModalPublicShare = () => {
  modal.toggle("sharePublic");
  restarOrInitSharePublic();
};
</script>

<template>
  <div class="fixed top-[70px] right-7">
    <button class="relative" @click="modal.toggle('dropdown')">
      <Icons.Share class="inline ml-1" />
    </button>
  </div>

  <Dropdown
    :state="modal.dropdown"
    class="!min-w-[170px] !top-28 !right-8 shadow-xl"
    @close="modal.toggle('dropdown')"
  >
    <div
      class="flex flex-col gap-4 dark:bg-zinc-700 bg-zinc-200 dark:text-zinc-300 p-3 rounded-lg cursor-pointer"
    >
      <h3 class="text-left text-sm">Share with:</h3>
      <button
        class="flex justify-between items-center hover:text-white"
        @click="[modal.toggle('sharePublic'), modal.toggle('dropdown')]"
      >
        <span>Everyone</span>
        <Icons.SharePublic class="inline" />
      </button>
      <button
        class="flex justify-between items-center hover:text-white"
        @click="[modal.toggle('sharePrivate'), modal.toggle('dropdown')]"
      >
        <span>Some only</span>
        <Icons.SharePrivate class="inline" />
      </button>
    </div>
  </Dropdown>

  <Tasks.ModalPublicShare
    :status="modal.sharePublic"
    @close="closeModalPublicShare()"
  />

  <Tasks.ModalPrivateShare
    :status="modal.sharePrivate"
    @close="closeModalPrivateShare()"
  />
</template>
