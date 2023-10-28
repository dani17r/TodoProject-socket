<script setup lang="ts">
import SelectAscDesc from "@components/SelectAscDesc.vue";
import InputSearch from "@components/InputSearch.vue";
import projectComposable from "@composables/project";
import Project from "@modules/project";
import Icons from "@components/icons";

const { refresh, ascDesc, select, modals, search, query } = projectComposable();
</script>

<template>
  <div class="content-filter">
    <div class="content-menu-one-filters">
      <InputSearch
        v-model="search.input"
        placeholder="Search Projects"
        @accept="search.find()"
        @clear="search.clear()"
      />

      <button class="btn-main !w-auto uppercase" @click="modals.open.create()">
        <Icons.Plus class="inline -mt-1" />
        <span class="mr-2">Create</span>
      </button>
    </div>
    <div class="content-menu-two-filters">
      <SelectAscDesc
        :query="query"
        @asc="ascDesc('asc')"
        @desc="ascDesc('desc')"
      />
      <div class="content-select-limit">
        <Icons.Limit class="inline absolute" />
        <select
          id="limit-two"
          v-model="query.limit"
          class="select-limit pl-8"
          @change="refresh"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  </div>

  <Project.ModalAddOrEdit
    :id="`modal_add_or_edit-${select.data._id}`"
    :modal="modals.addEdit"
    @close="modals.toggle('addEdit')"
  />
</template>

<style>
.content-filter {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  position: fixed;
  left: 0;
  top: 36px;
  width: 100%;
  padding: 0px 40px;
  background-color: #27272ac9;
  z-index: 30;
  padding-bottom: 5px;
  padding-top: 20px;
  backdrop-filter: blur(6px);
  opacity: 0.95;
}

.content-menu-one-filters {
  @apply w-full flex items-center rounded-lg justify-between;
}

.content-menu-two-filters {
  @apply w-full flex items-center rounded-lg justify-between my-3;
}

.select-limit {
  @apply text-sm block w-full py-2 pr-1 bg-zinc-700 border-zinc-600 text-white focus:ring-blue-500 focus:border-blue-500 focus:outline-none rounded-lg;
}

.content-select-limit {
  @apply text-zinc-200 w-[100px] rounded-lg bg-zinc-700 text-sm inline-flex gap-2 items-center pl-2;
}
</style>
