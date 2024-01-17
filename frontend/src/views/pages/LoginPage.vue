<script setup lang="ts">
// project libraries
import { loginComposable } from "@composables/auth";
import { superErrors } from "@utils/main";

/** Composables */
const { form, login, errors } = loginComposable();

// Manejo de errores en las class de los elementos
const inputError = superErrors(errors);
</script>

<template>
  <div class="mt-10">
    <div class="content-flex-simple mb-2">
      <h1 class="title">Login user</h1>
    </div>
    <div class="content-flex-simple">
      <form class="content-form">
        <div class="mb-4">
          <label class="label" for="email"> Email </label>
          <input
            id="email"
            v-model="form.email"
            :class="['input', inputError('email')]"
            placeholder="email"
          />
          <p class="input-error">
            {{ errors?.email }}
          </p>
        </div>
        <div class="mb-6">
          <label class="label" for="password"> Password </label>
          <input
            id="password"
            v-model="form.password"
            :class="['input', inputError('password')]"
            placeholder="••••••••"
            type="password"
            autocomplete="true"
          />
          <p class="input-error">
            {{ errors?.password }}
          </p>
        </div>
        <div class="content-flex-between">
          <button class="btn-main" type="button" @click="login()">
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
