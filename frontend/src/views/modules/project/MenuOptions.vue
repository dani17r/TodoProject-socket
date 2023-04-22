<script setup lang="ts">
import projectComposable from "@composables/project";
import Project from "@modules/project";
import Icons from "@components/icons";

const { getAll, ascDesc, select, modals, search, query } = projectComposable();

const sortActive = (val: string) =>
  query.value.sort.includes(val) && "bg-zinc-300 text-zinc-800";
</script>

<template>
  <div class="content-filter">
    <div class="content-menu-one-filters">
      <div class="flex">
        <div class="search">
          <input
            id="search"
            v-model="search.input"
            placeholder="Search Projects"
            class="input-search"
            @keydown.enter="search.find()"
          />
          <Icons.Search class="icon-search" @click="search.find()" />
          <Icons.Close
            v-show="search.input.length > 0"
            class="icon-clear"
            @click="[search.clear(), search.find()]"
          />
        </div>
        <button
          class="bg-zinc-200 rounded-r-lg px-3 text-zinc-900"
          @click="search.find()"
        >
          Search
        </button>
      </div>

      <button class="btn-create-project" @click="modals.open.create()">
        <span> Create </span>
        <Icons.Plus />
      </button>
    </div>
    <div class="content-menu-two-filters">
      <div class="actions">
        <button
          :class="['btn-sort rounded-l-md', sortActive('asc')]"
          @click="ascDesc('asc')"
        >
          Asc
        </button>
        <button
          :class="['btn-sort rounded-r-md', sortActive('desc')]"
          @click="ascDesc('desc')"
        >
          Desc
        </button>
      </div>
      <div class="content-select-limit">
        <label id="label-limit">Limit</label>
        <select
          id="limit"
          ref="selectLimit"
          v-model="query.limit"
          class="select-limit"
          @change="getAll()"
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
  @apply my-5;
}

.content-menu-one-filters {
  @apply w-full flex items-center rounded-lg justify-between;
}

.content-menu-two-filters {
  @apply w-full flex items-center rounded-lg justify-between my-3;
}

.search {
  @apply relative;
}

.input-search {
  @apply appearance-none border rounded-l-md py-2 pl-[45px] pr-3 text-gray-700 leading-tight focus:outline-none dark:text-white dark:bg-zinc-700 dark:border-zinc-400 min-w-[340px];
}

.icon-search {
  @apply absolute top-2 left-3;
}

.icon-clear {
  @apply absolute top-[9px] right-3;
}

.actions {
  @apply flex;
}

.btn-create-project {
  @apply flex gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none;
}

.btn-sort {
  @apply px-2 border border-zinc-400;
}

.select-limit {
  @apply text-zinc-900 text-sm block bg-zinc-300 pl-2 py-1 focus:outline-none focus:ring-0;
}

.content-select-limit {
  @apply text-zinc-900 bg-zinc-300 text-sm inline-flex gap-2 items-center pl-2;
}
</style>
