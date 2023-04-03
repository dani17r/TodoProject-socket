<script setup lang="ts">
import Icons from "@components/icons";
import { computed, ref } from "vue";

export interface NotifyOptionsI {
  classContent?: string;
  autoClose?: boolean;
  timeout?: number;
  state: boolean;
  icon?: string;
  msg: string;
}

const props = withDefaults(defineProps<NotifyOptionsI>(), {
  classContent: "text-gray-200 bg-blue-900",
  icon: "CircleCheck",
  autoClose: true,
  timeout: 2000,
  state: false,
  msg: "",
});

const dismissible = ref(props.state);

const autoCloseModal = () => {
  setTimeout(() => {
    dismissible.value = false;
  }, props.timeout);
};

const state = computed(() => {
  if (props.autoClose) autoCloseModal();
  return dismissible.value;
});
</script>

<template>
  <Transition name="fade">
    <div v-show="state" class="notify">
      <div class="mx-auto">
        <div :class="`content ${props.classContent}`">
          <component :is="Icons[props.icon]" />
          <div class="message">{{ props.msg }}</div>
          <button class="close" @click="dismissible = false">
            <Icons.Close />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.notify {
  @apply fixed bottom-3 right-3 z-50;
}
.notify .content {
  @apply flex items-center w-full max-w-xs p-4 rounded-lg shadow;
}
.notify .message {
  @apply ml-3 text-lg font-normal;
}
.notify .close {
  @apply ml-3 -my-1.5 text-white hover:text-gray-900 rounded-lg p-1.5 inline-flex h-8 w-8 dark:text-white;
}
</style>
