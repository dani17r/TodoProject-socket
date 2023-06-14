<script setup lang="ts">
import type { GroupI } from "@interfaces/interfaces.project";
import Confirm from "@components/modals/ModalConfirm.vue";
import shareComposable from "@composables/share";
import { superModals } from "@utils/inputs";
import Icons from "@components/icons";
import Task from "@modules/task";
import { remove } from "lodash";
import { ref } from "vue";

const { share } = shareComposable();
let modals = superModals({ selectUser: false, confirm: false });
let status = ref({});
let seed = ref(true);

const selectAll = (field: string) => {
  status.value[field] = !status.value[field];
  share.value?.private.group.map((user) => {
    user.permissions[field] = status.value[field];
    return user;
  });
};

const deleteAllUsers = () => {
  share.value?.private.group.splice(0);
};

const removeUser = (guest: GroupI) => {
  const arr = share.value?.private.group;
  if (arr) remove(arr, (guest_) => guest_._id == guest._id);
};
</script>

<template>
  <div class="content-t-permissions">
    <table class="t-permissions">
      <thead class="t-thead-permissions">
        <tr>
          <th class="py-4 bg-zinc-700">Email user</th>
          <th class="py-4">Seed</th>
          <th class="py-4 bg-zinc-700">Create</th>
          <th class="py-4">Update</th>
          <th class="py-4 bg-zinc-700">Delete</th>
          <th class="py-4">Move task</th>
          <th class="py-4 bg-zinc-700">Seed Trash</th>
          <th class="py-4">Remove to trash</th>
          <th class="py-4 bg-zinc-700"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th class="bg-zinc-700 border-y-2 border-y-zinc-500">
            <button @click="modals.toggle('selectUser')">
              <Icons.Plus class="inline !w-4 !h-4" />
              <span>ADD</span>
            </button>
          </th>
          <td class="border-y-2 border-y-zinc-500">
            <input id="seed" v-model="seed" disabled type="checkbox" />
          </td>
          <td class="bg-zinc-700 border-y-2 border-y-zinc-500">
            <input id="create" type="checkbox" @click="selectAll('c')" />
          </td>
          <td class="border-y-2 border-y-zinc-500">
            <input id="update" type="checkbox" @click="selectAll('u')" />
          </td>
          <td class="bg-zinc-700 border-y-2 border-y-zinc-500">
            <input id="delete" type="checkbox" @click="selectAll('d')" />
          </td>
          <td class="border-y-2 border-y-zinc-500">
            <input id="move" type="checkbox" @click="selectAll('m')" />
          </td>
          <td class="bg-zinc-700 border-y-2 border-y-zinc-500">
            <input id="seed_trash" type="checkbox" @click="selectAll('st')" />
          </td>
          <td class="border-y-2 border-y-zinc-500">
            <input id="remove" type="checkbox" @click="selectAll('r')" />
          </td>
          <td class="px-4 py-2 bg-zinc-700 border-y-2 border-y-zinc-500">
            <button @click="modals.toggle('confirm')">
              <Icons.Close />
            </button>
          </td>
        </tr>

        <tr v-for="(user, index) in share?.private.group" :key="index">
          <th
            scope="row"
            class="py-4 font-medium whitespace-nowrap text-white bg-zinc-700"
          >
            {{ user.email }}
          </th>
          <td>
            <input
              id="seed"
              v-model="user.permissions.s"
              disabled
              type="checkbox"
            />
          </td>
          <td class="bg-zinc-700">
            <input v-model="user.permissions.c" type="checkbox" />
          </td>
          <td>
            <input v-model="user.permissions.u" type="checkbox" />
          </td>
          <td class="bg-zinc-700">
            <input v-model="user.permissions.d" type="checkbox" />
          </td>
          <td>
            <input id="move" v-model="user.permissions.m" type="checkbox" />
          </td>
          <td class="bg-zinc-700">
            <input v-model="user.permissions.st" type="checkbox" />
          </td>
          <td>
            <input v-model="user.permissions.r" type="checkbox" />
          </td>
          <td scope="row" class="px-4 bg-zinc-700">
            <button @click="removeUser(user)">
              <Icons.Close />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Task.ModalSelectUserForShare
    :status="modals.selectUser"
    @close="modals.toggle('selectUser')"
  />

  <Confirm
    v-model="modals.confirm"
    message="Are you sure remove all ?"
    @close="modals.toggle('confirm')"
    @confirm="deleteAllUsers()"
  />
</template>

<style>
.content-t-permissions {
  @apply relative overflow-x-auto shadow-md sm:rounded-lg;
}
.t-permissions {
  @apply w-full text-sm text-center text-zinc-400;
}
.t-thead-permissions {
  @apply text-xs text-zinc-400 uppercase;
}
</style>
