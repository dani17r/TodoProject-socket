<script setup lang="ts">
import generalComposable from "@composables/general";
import Icons from "@components/icons";

const { loading } = generalComposable();
</script>

<template>
  <router-view />

  <Transition name="fade">
    <div
      v-if="loading.val"
      class="fixed bg-[#27272A] left-0 top-0 z-[100] w-full h-[100vh] flex justify-center items-center"
    >
      <Icons.Loading />
    </div>
  </Transition>
  <div id="area"></div>
</template>
