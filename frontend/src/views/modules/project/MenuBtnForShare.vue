<script setup lang="ts">
// project libraries
import ModalPublicShare from "@modules/project/ModalPublicShare.vue";
import Dropdown from "@components/MenuDropdown.vue";
import Icons from "@components/icons";

import { superModals } from "@utils/inputs";

const model = superModals({
  dropdown: false,
  sharePublic: false,
});
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
      <button class="flex justify-between items-center hover:text-white">
        <span>Some only</span>
        <Icons.SharePrivate class="inline" />
      </button>
    </div>
  </Dropdown>

  <ModalPublicShare
    :status="model.sharePublic"
    @close="model.toggle('sharePublic')"
  />
</template>
