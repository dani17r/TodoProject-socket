<script setup lang="ts">
import InputToggle from "@components/InputToggle.vue";
import shareComposable from "@composables/share";
import { projectStore } from "@stores/project";
import Modals from "@components/modals";
import { useRoute } from "vue-router";
import Tasks from "@modules/task";
import { computed } from "vue";

const events = defineEmits(["close"]);
const props = defineProps({ status: Boolean });
const modal = computed(() => props.status);

const { share } = shareComposable();
const { update, changeShare } = projectStore();
const route = useRoute();

const projectId = String(route.params.id);

const saveModalPrivateShare = () => {
  if (share.value) share.value.public.status = false;
  update(
    { _id: projectId, share: share.value },
    {
      actions: (updatedProject) => {
        setTimeout(() => events("close"));
        if (updatedProject) changeShare(updatedProject);
      },
    }
  );
};
</script>

<template>
  <Modals.Main v-model="modal" :width="'950px'" @close="events('close')">
    <div v-if="share">
      <Tasks.UrlShare />

      <InputToggle
        v-model="share.private.status"
        title="Share private board"
        class="mb-5"
      />

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
