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
const { update, changeShare } = projectStore();

const route = useRoute();

const { share } = shareComposable();

const projectId = String(route.params.id);

const savePublicShare = () => {
  if (share.value) share.value.private.status = false;
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
  <Modals.Main v-model="modal" :width="'470px'" @close="events('close')">
    <div v-if="share">
      <Tasks.UrlShare :project-id="projectId" />

      <InputToggle v-model="share.public.status" title="Share public board" />

      <h1 class="py-4 text-xl font-semibold">Permissions</h1>
      <div class="grid grid-cols-2 gap-5 mt-2">
        <div>
          <input
            id="seed"
            v-model="share.public.permissions.s"
            type="checkbox"
            :disabled="true"
          />
          <label for="seed" class="ml-3">Seed task</label>
        </div>
        <div>
          <input
            id="created"
            v-model="share.public.permissions.c"
            type="checkbox"
          />
          <label for="created" class="ml-3">Create task</label>
        </div>
        <div>
          <input
            id="seed-trash"
            v-model="share.public.permissions.st"
            type="checkbox"
          />
          <label for="seed-trash" class="ml-3">Seed trash</label>
        </div>
        <div>
          <input
            id="updated"
            v-model="share.public.permissions.u"
            type="checkbox"
          />
          <label for="updated" class="ml-3">Update task</label>
        </div>
        <div>
          <input
            id="move"
            v-model="share.public.permissions.m"
            type="checkbox"
          />
          <label for="move" class="ml-3">Move task</label>
        </div>
        <div>
          <input
            id="remove"
            v-model="share.public.permissions.r"
            type="checkbox"
          />
          <label for="remove" class="ml-3">Remove task to trash</label>
        </div>
        <div>
          <input
            id="delete"
            v-model="share.public.permissions.d"
            type="checkbox"
          />
          <label for="delete" class="ml-3">Delete task in trash</label>
        </div>
      </div>

      <button class="btn-main mt-7" @click="savePublicShare()">Accept</button>
    </div>
  </Modals.Main>
</template>
