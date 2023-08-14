<script setup lang="ts">
import Dropdown from "@components/MenuDropdown.vue";
import Modals from "@components/modals";
import Project from "@modules/project";
import Icons from "@components/icons";

import { onMounted, computed } from "vue";
import { truncate } from "lodash";

import type { FormsI } from "@interfaces/interfaces.project";
import projectComposable from "@composables/project";
import { nowTime, pushLink } from "@utils/main";
import { projectStore } from "@stores/project";

const { dropdown, remove, select, modals, query } = projectComposable();
const { projects, getAll } = projectStore();

let selectProject = computed(() => select.data as FormsI["full"]);
let isEmptyProject = computed(() => projects.value.data.length);

onMounted(() => getAll(true));
</script>

<template>
  <div
    :class="[
      !isEmptyProject && 'flex justify-center items-center',
      'min-h-[48vh] w-full',
    ]"
  >
    <TransitionGroup
      v-if="isEmptyProject"
      name="list"
      tag="div"
      class="list-project"
    >
      <div
        v-for="(project, index) in projects.data"
        :key="index"
        class="relative"
      >
        <div :class="['zoom', dropdown.get(index) && 'cool-zoom']">
          <div
            class="card-project"
            @click="pushLink('project-one', { id: project._id })"
          >
            <h2 class="text-2xl">
              {{ truncate(project.title, { length: 18 }) }}
            </h2>
            <p class="text-md">
              {{ truncate(project.description, { length: 53 }) }}
            </p>
            <span class="card-now-time">{{ nowTime(project.createdAt) }}</span>
          </div>
          <button class="btn-options btn-one" @click="dropdown.toggle(index)">
            <Icons.MenuVertical />
          </button>
        </div>
        <Dropdown
          :id="project._id"
          :state="dropdown.get(index)"
          @close="dropdown.toggle(index)"
        >
          <div
            class="flex flex-col gap-4 dark:bg-zinc-700 bg-zinc-200 dark:text-zinc-300 p-3 rounded-lg cursor-pointer"
          >
            <div
              class="flex justify-between items-center hover:text-white"
              @click="modals.open.update(project, index)"
            >
              <span>Edite</span>
              <Icons.Edit class="inline" />
            </div>
            <div
              class="flex justify-between items-center hover:text-white"
              @click="modals.open.delete(project._id, index)"
            >
              <span>Delete</span>
              <Icons.Delete class="inline" />
            </div>
          </div>
        </Dropdown>
      </div>
    </TransitionGroup>

    <div v-else class="flex flex-col justify-center items-center">
      <template v-if="query.search != ''">
        <h2 class="text-xl font-semibold">Nothing found</h2>
        <p class="text-lg">Maybe you should look for something else</p>
      </template>
      <template v-else>
        <h1 class="mb-10 text-2xl">Welcome to To-Do-Projects</h1>
        <div class="new-card-project zoom" @click="modals.open.create()">
          <Icons.Plus />
        </div>
      </template>
    </div>
  </div>

  <Project.ModalAddOrEdit
    :id="`modal_add_or_edit-${selectProject._id}`"
    :modal="modals.addEdit"
    :updated="selectProject"
    @close="modals.toggle('addEdit')"
  />

  <Modals.Confirm
    :id="`modal_confirm-${select.id}`"
    v-model="modals.confirm"
    message="Do you want to delete this project?"
    @close="modals.toggle('confirm')"
    @confirm="remove()"
  />
</template>

<style>
.list-project {
  @apply w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8;
}
.card-project {
  @apply min-h-[140px] sm:max-w-[420px] px-5 pt-10 bg-blue-400 dark:bg-blue-700 flex flex-col cursor-pointer rounded-lg;
}
.new-card-project {
  @apply min-h-[140px] w-[200px] sm:max-w-[420px] bg-blue-400 dark:bg-blue-700 flex justify-center items-center cursor-pointer rounded-lg;
}
.card-now-time {
  @apply text-xs mt-4 absolute top-0;
}
.zoom {
  @apply hover:scale-110 transition-all;
}
.cool-zoom {
  @apply scale-110 transition-all;
}
.btn-options {
  @apply absolute top-0 right-0;
}
</style>
