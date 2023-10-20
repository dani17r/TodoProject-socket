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
  <div class="cont-paginate">
    <Pagination
      :paginate="projects.paginate"
      :query="query"
      @select-pag="pagination.selectPag"
      @previe="pagination.previe"
      @next="pagination.next"
    />
  </div>
</template>

<style>
.content-paginate {
  width: 100%;
}
.cont-paginate {
  position: fixed;
  width: 100%;
  left: 0;
  padding: 0px 20px;
  bottom: 0px;
  height: 60px;
  display: flex;
  justify-items: center;
  background-color: #27272ac9;
  backdrop-filter: blur(6px);
  opacity: 0.95;
}
</style>