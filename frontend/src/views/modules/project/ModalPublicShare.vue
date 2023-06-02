<script setup lang="ts">
import { projectStore } from "@stores/project";
import Modals from "@components/modals";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";

const events = defineEmits(["close"]);
const props = defineProps({ status: Boolean });
const modal = computed(() => props.status);
const { update, project } = projectStore();

const route = useRoute();

let share = ref(project.value?.share);

const savePublicShare = () => {
  update({ _id: String(route.params.id), share: share.value });
  events("close");
};
</script>

<template>
  <Modals.Main v-model="modal" :width="'470px'" @close="events('close')">
    <div v-if="share">
      <p class="font-sans font-extralight">
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            v-model="share.public.status"
            type="checkbox"
            value=""
            class="sr-only peer"
          />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
          <span class="ml-3 dark:text-gray-300">Share board publicly</span>
        </label>
      </p>
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

      <button class="btn-main mt-7" @click="savePublicShare()">Acept</button>
    </div>
  </Modals.Main>
</template>
