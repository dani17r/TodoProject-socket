<script setup lang="ts">
import type { FormsI } from "@interfaces/interfaces.task";
import Modals from "@components/modals";
import { computed } from "vue";

const events = defineEmits(["close"]);

interface PropsI {
  view?: FormsI["full"];
  modal: boolean;
}

const props = defineProps<PropsI>();
const status = computed(() => props.modal);
</script>

<template>
  <Modals.Main v-model="status" @close="events('close')">
    <div class="content mt-3">
      <h1 class="text-xl mb-2">{{ view?.name }}</h1>

      <div class="ql-container ql-disabled ql-snow !bg-transparent">
        <div
          class="ql-editor ql-blank !px-0 !py-3"
          v-html="view?.content"
        ></div>
      </div>
    </div>
  </Modals.Main>
</template>
