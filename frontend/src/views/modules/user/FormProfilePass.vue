<script setup lang="ts">
import { validationForm } from "@utils/validations";
import notifyComposable from "@composables/notify";
import { userStore } from "@stores/user";
import { reactive, computed } from "vue";

const Notify = notifyComposable();
const { user, changePassword } = userStore();

const form = reactive({
  current: "",
  verify: "",
  new: "",
});

const ifNotEmptyFields = computed(() =>
  Boolean(form.current.length && form.new.length && form.verify.length)
);

const { check, errors, setError } = validationForm({
  current: ["empty", "min:8"],
  verify: ["empty", "min:8"],
  new: ["empty", "min:8"],
});

const notifyEqualPass = {
  message: "The new password is different to verification",
  field: "verify",
};

const updatePassword = () => {
  const status = check(form);

  if (status.value)
    if (form.verify != form.new) setError(notifyEqualPass);
    else {
      changePassword(
        {
          currentPassword: form.current,
          _id: String(user.value?._id),
          newPassword: form.new,
        },
        {
          actions: (notify) => Notify.success(String(notify?.message)),
          error: (msg) => Notify.error(msg.message),
        }
      );
    }
};
</script>

<template>
  <div class="content-profile">
    <h1 class="font-bold text-xl mb-2">Change Password</h1>
    <div class="box-field">
      <label for="current_pass">Current Password</label>
      <input
        id="current_pass"
        v-model.trim="form.current"
        placeholder="••••••••"
        type="password"
        class="input"
      />
      <p class="input-error">
        {{ errors?.current }}
      </p>
    </div>
    <div class="box-field">
      <label for="new_pass">New Password</label>
      <input
        id="new_pass"
        v-model.trim="form.new"
        placeholder="••••••••"
        type="password"
        class="input"
      />
      <p class="input-error">
        {{ errors?.new }}
      </p>
    </div>
    <div class="box-field">
      <label for="verifyNewPass">Verify password</label>
      <input
        id="verify_new_pass"
        v-model.trim="form.verify"
        placeholder="••••••••"
        type="password"
        class="input"
      />
      <p class="input-error">
        {{ errors?.verify }}
      </p>
    </div>

    <div class="box-field mt-3">
      <button
        class="btn-main disabled-btn-main"
        :disabled="!ifNotEmptyFields"
        @click="updatePassword()"
      >
        Change
      </button>
    </div>
  </div>
</template>
