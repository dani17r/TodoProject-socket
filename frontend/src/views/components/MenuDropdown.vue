<script setup lang="ts">
defineEmits(["close"]);

interface PropsI {
  state: boolean;
}
const props = withDefaults(defineProps<PropsI>(), {
  state: false,
});
</script>

<template>
  <teleport to="#area">
    <div
      v-show="props.state"
      :id="`dropdown_blur-${$attrs.id}`"
      class="dropdown-blur"
      @click="$emit('close')"
    ></div>
  </teleport>
  <div
    v-show="props.state"
    :id="`dropdown_menu-${$attrs.id}`"
    :class="`dropdown-menu ${$attrs.class}`"
  >
    <slot />
  </div>
</template>

<style>
.dropdown-blur {
  @apply fixed top-0 left-0 w-full h-full z-30;
}

.dropdown-menu {
  @apply absolute top-1 right-8 z-20 min-w-[150px] min-h-[30px];
}
</style>
