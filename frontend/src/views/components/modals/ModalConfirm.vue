<script setup lang="ts">
import Modals from "@components/modals";
import Icons from "@components/icons";
import { computed } from "vue";

const emits = defineEmits(["close", "confirm"]);

interface PropsI {
  modelValue: boolean;
  minHeight?: string;
  message: string;
}

const props = withDefaults(defineProps<PropsI>(), {
  message: "Are you sure to delete this?",
  minHeight: "135px",
  modelValue: false,
});

const status = computed(() => props.modelValue);

let memory = true;
const close = () => {
  if (memory) {
    memory = false;
    emits("close");
    setTimeout(() => (memory = true), 400);
  }
};
</script>

<template>
  <Modals.Main
    v-model="status"
    :min-height="props.minHeight"
    :z-index="100"
    @close="close()"
  >
    <button class="absolute right-[20px]" @click="close()">
      <Icons.Close />
    </button>
    <div class="content-confirm">
      <h1 class="text-confirm">{{ props.message }}</h1>
    </div>
    <div class="flex gap-4">
      <button class="btn-main" @click="emits('confirm')">Yes</button>
      <button class="btn-main !bg-red-500 hover:!bg-red-600" @click="close()">
        No
      </button>
    </div>
  </Modals.Main>
</template>

<style>
.content-confirm {
  @apply flex flex-col justify-center items-center gap-4 my-4;
}

.text-confirm {
  @apply dark:text-zinc-300 text-zinc-800 text-lg px-2 text-center;
}
</style>
