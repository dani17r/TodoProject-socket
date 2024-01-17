<script setup lang="ts">
// project libraries
import { signupComposable } from "@composables/auth";
import { superErrors } from "@utils/main";

/** Composables */
const { form, errors, register } = signupComposable();

const inputError = superErrors(errors);
</script>

<template>
  <div class="mt-10">
    <div class="content-flex-simple mb-2">
      <h1 class="title">Register user</h1>
    </div>
    <div class="content-flex-simple">
      <form class="content-form">
        <div class="mb-4">
          <label class="label" for="fullname"> full name </label>
          <input
            id="fullname"
            v-model="form.fullname"
            :class="['input', inputError('fullname')]"
            placeholder="Full name"
          />
          <p class="input-error">{{ errors?.fullname }}</p>
        </div>
        <div class="mb-4">
          <label class="label" for="email"> email </label>
          <input
            id="email"
            v-model="form.email"
            :class="['input', inputError('email')]"
            placeholder="email@email.com"
          />
          <p class="input-error">{{ errors?.email }}</p>
        </div>

        <div class="mb-6">
          <label class="label" for="password"> Password </label>
          <input
            id="password"
            v-model="form.password"
            :class="['input', inputError('password')]"
            placeholder="******************"
            autocomplete="true"
            type="password"
          />
          <p class="input-error">{{ errors?.password }}</p>
        </div>
        <div class="content-flex-between">
          <button class="btn-main" type="button" @click="register()">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
