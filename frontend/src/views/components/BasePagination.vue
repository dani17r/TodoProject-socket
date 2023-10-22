<script setup lang="ts">
import type { PaginateI, QueryI } from "@interfaces/interfaces.generals";
import Icons from "@components/icons";
import { computed } from "vue";

const emits = defineEmits(["next", "previe", "selectPag"]);

interface PropsI {
  paginate?: PaginateI;
  query: QueryI;
}

const props = defineProps<PropsI>();

const isPrevie = computed(() => Number(props.query.pag) >= 2);
const paginate = computed(() => props.paginate);

const isCurrentPag = (item: number) => {
  const currentPag = Number(paginate.value?.currentPag);
  const isCondition = Number(item) == currentPag;
  return isCondition ? "item-pag-active" : "item-pag";
};

const isNext = computed(() => {
  return Number(props.query.pag) < Number(paginate.value?.totalPag);
});
</script>

<template>
  <Transition name="fade">
    <div v-if="paginate" class="content-paginate">
      <div class="box-paginate">
        <div>
          <p class="description-paginate">
            Showing
            <span class="font-medium">{{ paginate?.currentPag }}</span>
            to
            <span class="font-medium">{{ paginate?.totalPag }}</span>
            of
            <span class="font-medium">{{ paginate?.total }}</span>
            results
          </p>
        </div>
        <div>
          <nav
            v-show="Number(paginate?.totalPag) > 1"
            class="group-btn-paginate"
          >
            <button
              :class="['previe-paginate', !isPrevie && 'opacity-30']"
              @click="emits('previe', isPrevie)"
            >
              <Icons.Previe />
            </button>
            <template v-for="item in paginate?.totalPag" :key="item">
              <button
                :class="isCurrentPag(item)"
                @click="emits('selectPag', item)"
              >
                {{ item }}
              </button>
            </template>
            <button
              :class="['next-paginate', !isNext && 'opacity-30']"
              @click="emits('next', isNext)"
            >
              <Icons.Next />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.content-paginate {
  @apply flex items-center justify-between bg-white dark:bg-zinc-800 px-4 py-3 sm:px-6;
}

.box-paginate {
  @apply sm:flex sm:flex-1 sm:items-center sm:justify-between;
}

.group-btn-paginate {
  @apply isolate inline-flex -space-x-px rounded-md;
}

.next-paginate {
  @apply relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-blue-500 focus:z-20 focus:outline-offset-0 dark:text-zinc-200;
}

.previe-paginate {
  @apply relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-blue-500 focus:z-20 focus:outline-offset-0 dark:text-zinc-200;
}

.description-paginate {
  @apply text-sm text-gray-700 dark:text-zinc-200;
}

.item-pag-active {
  @apply relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600;
}

.item-pag {
  @apply relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-zinc-200 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-zinc-900 focus:z-20 focus:outline-offset-0;
}

.jump-pag {
  @apply relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-zinc-200 ring-1 ring-inset ring-gray-300 focus:outline-offset-0;
}
</style>
