<script setup lang="ts">
import Pagination from "@components/BasePagination.vue";
import projectComposable from "@composables/project";
import useProjectStore from "@stores/project";
import { storeToRefs } from "pinia";

const userStore = useProjectStore();
const { pagination } = projectComposable();
const { projects, query } = storeToRefs(userStore);
</script>

<template>
  <div class="mt-8">
    <Pagination
      :paginate="projects.paginate"
      :query="query"
      @select-pag="pagination.selectPag"
      @previe="pagination.previe"
      @next="pagination.next"
    />
  </div>
</template>
