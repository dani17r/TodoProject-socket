<script setup lang="ts">
import InputToggle from "@components/InputToggle.vue";
import shareComposable from "@composables/share";
import { projectStore } from "@stores/project";
import Modals from "@components/modals";
import { useRoute } from "vue-router";
import Tasks from "@modules/task";
import { computed, ref } from "vue";

const events = defineEmits(["close"]);
const props = defineProps({ status: Boolean });
const modal = computed(() => props.status);

const { share } = shareComposable();
const { update } = projectStore();
const route = useRoute();

const status = ref(share.value?.private.status || false);

const projectId = String(route.params.id);

const saveModalPrivateShare = () => {
  if (share.value) share.value.private.status = status.value;
  update(
    { _id: projectId, share: share.value },
    {
      actions: () => setTimeout(() => events("close")),
    }
  );
};
</script>

<template>
  <Modals.Main v-model="modal" :width="'950px'" @close="events('close')">
    <div>
      <Tasks.UrlShare />
      <InputToggle v-model="status" title="Share private board" class="mb-5" />
      <Tasks.TablePrivateShare />
      <button
        class="btn-main mt-4 float-right !w-32"
        @click="saveModalPrivateShare()"
      >
        Save
      </button>
    </div>
  </Modals.Main>
</template>
