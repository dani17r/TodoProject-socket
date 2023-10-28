<script setup lang="ts">
import ShareUrl from "@modules/task/share/ShareUrl.vue";
import InputSearch from "@components/InputSearch.vue";
import { computed, onMounted, ref } from "vue";
import { projectStore } from "@stores/project";
import { debounce, lowerCase } from "lodash";
import { superForm } from "@utils/inputs";
import Modals from "@components/modals";
import Icons from "@components/icons";

interface PropsI {
  modelValue: boolean;
  minHeight?: string;
}

const emits = defineEmits(["close"]);
const props = withDefaults(defineProps<PropsI>(), {
  minHeight: "200px",
  modelValue: false,
});

const { getShared, shared } = projectStore();

const status = computed(() => props.modelValue);
const cloneShared = computed(() => shared.value);
const shareFilter = ref();
let memory = ref(true);

const close = () => {
  if (memory.value) {
    memory.value = false;
    emits("close");
    setTimeout(() => (memory.value = true), 400);
  }
};

const FindShared = () => {
  return shared.value?.filter((val) => {
    let searchDescription = lowerCase(val.description).includes(search.input);
    let searchName = lowerCase(val.author.fullname).includes(search.input);
    let searchEmail = lowerCase(val.author.email).includes(search.input);
    let searchTitle = lowerCase(val.title).includes(search.input);

    return searchDescription || searchName || searchEmail || searchTitle;
  });
};

const search = superForm({
  input: "",
  find: debounce(() => (shareFilter.value = FindShared()), 900),
  empty: () => {
    shareFilter.value = cloneShared.value;
    search.input = "";
  },
});

onMounted(() => {
  getShared({ 
    actions: () => {
      setTimeout(() => shareFilter.value = cloneShared.value, 200)
    },
  });
});
</script>

<template>
  <Modals.Main
    v-model="status"
    :min-height="props.minHeight"
    :z-index-important="true"
    :width="'620px'"
    :z-index="1000"
    @close="close()"
  >
    <button class="absolute right-[20px]" @click="close()">
      <Icons.Close />
    </button>
    <div class="content-modal-shared">
      <h1 class="text-shared">Links of projects shared with me</h1>
      <InputSearch
        v-model="search.input"
        class-content="w-full"
        class="w-full"
        placeholder="Search title, description, autor or email"
        @change="search.find()"
        @clear="search.clear(), search.empty()"
      />
      <div class="content-shared scrollable">
        <div
          v-for="(project, index) in shareFilter"
          :key="index"
          class="shared"
        >
          <ShareUrl :project-id="project._id" class="w-full !mb-0 pr-3" />
          <span class="ml-2"
            >Autor: {{ project.author.fullname }} -
            {{ project.author.email }}</span
          >
          <span class="ml-2">Title: {{ project.title }}</span>
          <span class="ml-2">Description: {{ project.description }}</span>
        </div>
      </div>
    </div>
  </Modals.Main>
</template>

<style>
.content-modal-shared {
  @apply flex flex-col justify-center items-center gap-4 my-4;
}

.text-shared {
  @apply dark:text-zinc-300 text-zinc-800 text-lg px-2 text-center;
}

.content-shared {
  @apply w-full h-[480px] overflow-y-scroll -mr-[25px];
}
.shared {
  @apply w-full flex flex-col my-8;
}
</style>
