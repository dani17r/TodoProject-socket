<script setup lang="ts">
import { reactive, computed, ref, watchEffect } from "vue";
import { validationForm } from "@utils/validations";
import notifyComposable from "@composables/notify";
import { userStore } from "@stores/user";

import UploadImgProfile from "@modules/user/UploadImgProfile.vue";
import type { FormsI } from "@interfaces/interfaces.user";

const Notify = notifyComposable();
const { user, update } = userStore();

const url = import.meta.env.VITE_URL_UPLOAD;
const form = reactive({
  ...user.value,
  file: new Blob(),
});

const cleanFile = ref(false);

const ifNotEmptyFields = computed(() =>
  Boolean(checkUpdate() && form.fullname?.length && form.email?.length),
);

const checkUpdate = () => {
  return (
    form.email != user.value?.email ||
    form.fullname != user.value?.fullname ||
    form.file.size
  );
};

const { check, errors, inputError } = validationForm({
  fullname: ["empty", "min:4"],
  email: ["empty", "email"],
});

const updateUser = () => {
  const verify = checkUpdate();
  const verifyTwo = check({
    fullname: String(form.fullname),
    email: String(form.email),
  });

  if (verify && verifyTwo.value)
    update(form as FormsI["update"], {
      actions: () => {
        Notify.success("updated success");
        cleanFile.value = true;
        setTimeout(() => (cleanFile.value = false), 300);
      },
      error: (msg) => Notify.error(msg.message),
    });
};

watchEffect(() => {
  form.email = user.value?.email;
  form.fullname = user.value?.fullname;
  form.image = user.value?.image;
});
</script>

<template>
  <div class="content-profile">
    <h1 class="font-bold text-xl mb-2">Change data user</h1>
    <div class="box-field">
      <UploadImgProfile
        :clean="cleanFile"
        :preview="`${url}/${form.image}`"
        @update="(file) => (form.file = file)"
      />
    </div>

    <div class="box-field">
      <label for="fullname">Full name</label>
      <input
        id="fullname"
        v-model.trim="form.fullname"
        :class="['input', inputError('fullname')]"
      />
      <p class="input-error">{{ errors?.fullname }}</p>
    </div>
    <div class="box-field">
      <label for="email">Email</label>
      <input
        id="email"
        v-model.trim="form.email"
        :class="['input', inputError('email')]"
      />
      <p class="input-error">{{ errors?.email }}</p>
    </div>

    <div class="box-field mt-3">
      <button
        class="btn-main disabled-btn-main"
        :disabled="!ifNotEmptyFields"
        @click="updateUser()"
      >
        Update
      </button>
    </div>
  </div>
</template>
