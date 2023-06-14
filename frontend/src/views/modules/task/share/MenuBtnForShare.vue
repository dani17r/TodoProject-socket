<script setup lang="ts">
import Dropdown from "@components/MenuDropdown.vue";
import shareComposable from "@composables/share";
import { userStore } from "@stores/user";
import { superModals } from "@utils/inputs";
import Icons from "@components/icons";
import Tasks from "@modules/task";

// project libraries
const { restarOrInitSharePrivate } = shareComposable();
const { restartUsers } = userStore();

const model = superModals({
  sharePrivate: false,
  sharePublic: false,
  dropdown: false,
});

const closeModalPrivateShare = () => {
  model.toggle("sharePrivate");
  restarOrInitSharePrivate();
  restartUsers();
};
</script>

<template>
  <div class="fixed top-[70px] right-7">
    <button class="relative" @click="model.toggle('dropdown')">
      <Icons.Share class="inline ml-1" />
    </button>
  </div>

  <Dropdown
    :state="model.dropdown"
    class="!min-w-[170px] !top-28 !right-8 shadow-xl"
    @close="model.toggle('dropdown')"
  >
    <div
      class="flex flex-col gap-4 dark:bg-zinc-700 bg-zinc-200 dark:text-zinc-300 p-3 rounded-lg cursor-pointer"
    >
      <h3 class="text-left text-sm">Share with:</h3>
      <button
        class="flex justify-between items-center hover:text-white"
        @click="[model.toggle('sharePublic'), model.toggle('dropdown')]"
      >
        <span>Everyone</span>
        <Icons.SharePublic class="inline" />
      </button>
      <button
        class="flex justify-between items-center hover:text-white"
        @click="[model.toggle('sharePrivate'), model.toggle('dropdown')]"
      >
        <span>Some only</span>
        <Icons.SharePrivate class="inline" />
      </button>
    </div>
  </Dropdown>

  <Tasks.ModalPublicShare
    :status="model.sharePublic"
    @close="model.toggle('sharePublic')"
  />

  <Tasks.ModalPrivateShare
    :status="model.sharePrivate"
    @close="closeModalPrivateShare()"
  />
</template>
