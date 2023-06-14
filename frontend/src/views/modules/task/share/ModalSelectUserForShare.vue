<script setup lang="ts">
import InputSearch from "@components/InputSearch.vue";
import shareComposable from "@composables/share";
import { superForm } from "@utils/inputs";
import { userStore } from "@stores/user";
import Modals from "@components/modals";
import Icons from "@components/icons";
import { computed, ref } from "vue";
import { debounce } from "lodash";

const props = defineProps({ status: Boolean });
const events = defineEmits(["close"]);

const { query, getAll, users } = userStore();
const { addNewUser, droupPrivateIds } = shareComposable();

const userImg = (img: string) => `${import.meta.env.VITE_URL_UPLOAD}/${img}`;

const modal = computed(() => props.status);
const notFountList = ref(false);

const search = superForm({
  input: "",
  find: debounce(() => {
    query.value.search = search.input;
    getAll({
      actions: () => {
        if (users.value.data.length < 1 && search.input.length >= 1) {
          notFountList.value = true;
        } else notFountList.value = false;
      },
    });
  }, 900),
  empty: () => {
    notFountList.value = false;
    query.value.search = "";
    getAll();
  },
});

const usersGroup = computed(() =>
  users.value.data.filter((user) => {
    return !droupPrivateIds.value?.includes(user._id);
  })
);
</script>

<template>
  <Modals.Main
    v-model="modal"
    min-height="70px"
    :width="'640px'"
    @close="events('close')"
  >
    <InputSearch
      v-model="search.input"
      class-content="w-full"
      placeholder="Search name or email"
      @change="search.find()"
      @clear="search.clear(), search.empty()"
    />
    <div class="content">
      <div v-for="(guest, index) in usersGroup" :key="index">
        <div class="bg-zinc-700 p-3 mt-2 shadow rounded">
          <div class="flex items-center border-gray-700">
            <img :src="userImg(guest.image)" class="image-mini-profile" />
            <div class="flex items-center justify-between w-full">
              <div class="pl-3 w-full">
                <p class="font-medium text-zinc-400">
                  {{ guest.fullname }}
                </p>
                <p class="text-sm text-zinc-300">
                  {{ guest.email }}
                </p>
              </div>
              <div>
                <button
                  class="bg-blue-500 p-1 text-white rounded-full"
                  @click="addNewUser(guest)"
                >
                  <Icons.Plus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="notFountList" class="bg-zinc-700 p-3 mt-2 shadow rounded">
        <div class="flex items-center border-gray-700">
          <div class="flex items-center justify-between w-full">
            <div class="pl-3 w-full">
              <p class="font-bold text-lg text-zinc-300">
                It Not found email or name:
                <i class="text-zinc-400">{{ query.search }}</i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modals.Main>
</template>
