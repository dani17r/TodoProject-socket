<script setup lang="ts">
import InputToggle from "@components/InputToggle.vue";
import shareComposable from "@composables/share";
import { projectStore } from "@stores/project";
import Modals from "@components/modals";
import Icons from "@components/icons";
import { useRoute } from "vue-router";
import Tasks from "@modules/task";
import { computed } from "vue";

const events = defineEmits(["close"]);
const props = defineProps({ status: Boolean });
const modal = computed(() => props.status);

const { share } = shareComposable();
const { update, changeShare, changeShareUsers, loading } = projectStore();
const route = useRoute();

const projectId = String(route.params.id);

const saveModalPrivateShare = () => {
  if (share.value) share.value.public.status = false;
  update(
    { _id: projectId, share: share.value },
    {
      actions: (project) => {
        project && changeShareUsers(project);
        project && changeShare(project);
      },
      finally: () => events("close"),
    },
  );
};
</script>

<template>
  <Modals.Main v-model="modal" :width="'950px'" @close="events('close')">
     <Transition name="fade">
      <div
        v-if="loading.val"
        class="absolute left-0 top-0 z-50 w-full h-[100%] bg-black opacity-50 flex justify-center items-center"
      >
        <Icons.Loading />
      </div>
    </Transition>
    <div v-if="share">
      <Tasks.UrlShare :project-id="projectId" />

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
        Accept
      </button>
    </div>
  </Modals.Main>
</template>
