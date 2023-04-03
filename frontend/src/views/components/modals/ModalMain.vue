<script setup lang="ts">
import { computed } from "vue";

defineEmits(["close"]);

interface PropsI {
  classContent?: string;
  modelValue: boolean;
  transition?: string;
  minHeight?: string;
  zIndex?: number;
  width?: string;
}

const props = withDefaults(defineProps<PropsI>(), {
  classContent: "flex justify-center items-center",
  minHeight: "250px",
  transition: "fade",
  modelValue: true,
  width: "400px",
  zIndex: 30,
});

const size = computed(() => ({
  minHeight: props.minHeight,
  width: props.width,
}));

const randomId = (length = 6) =>
  Math.random()
    .toString(36)
    .substring(2, length + 2);
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <Teleport to="#area">
    <div
      v-if="props.modelValue"
      :class="['bg-modal', `z-[${props.zIndex}]`]"
    ></div>
    <Transition :name="props.transition">
      <div
        v-if="props.modelValue"
        :class="[
          `content-modal-main z-[${Number(props.zIndex) + 20}]`,
          props.classContent,
        ]"
      >
        <div
          :id="String($attrs.id) && randomId(10)"
          class="bg-click"
          @click.once="$emit('close')"
        ></div>
        <div class="content-modal-slot" v-bind="$attrs" :style="size">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.bg-modal {
  @apply bg-[#0c0c0c7d] fixed w-full h-[100vh] top-0;
}

.content-modal-main {
  @apply fixed w-full h-[100vh] top-0;
}

.bg-click {
  @apply fixed w-full h-[100vh] z-10 top-0;
}

.content-modal-slot {
  @apply bg-zinc-800 rounded-lg px-6 py-4 relative z-50;
}
</style>
