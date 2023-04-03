<script setup lang="ts">
import Icons from "@components/icons";
import { useRoute } from "vue-router";

const route = useRoute();

const activeLink = (name: string) => route.name == name && "active-link";
const pushLink = (name: string) => ({ name });
</script>

<template>
  <div class="auth content-nav">
    <nav>
      <ul>
        <li>
          <router-link
            :class="['link-one', activeLink('login')]"
            :to="pushLink('login')"
          >
            <Icons.Login />
            Login
          </router-link>
        </li>
        <li>
          <router-link
            :class="['link-two', activeLink('register')]"
            :to="pushLink('register')"
          >
            <Icons.Register />
            Register
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
  <div class="pt-20">
    <RouterView />
  </div>
</template>

<style>
.auth .active-link {
  @apply bg-gray-100 text-blue-500 !important;
}
.auth.content-nav {
  @apply w-full mb-10 fixed z-50;
}
.auth.content-nav nav {
  @apply bg-blue-500 px-4 py-2 dark:bg-blue-900;
}
.auth.content-nav nav ul {
  @apply flex justify-end;
}
.auth.content-nav nav ul li {
  @apply mr-3;
}
.auth .link-one {
  @apply inline-block border border-transparent rounded py-1 px-3 hover:bg-gray-100 hover:text-blue-500 text-white;
}
.auth .link-two {
  @apply inline-block border border-white rounded hover:text-blue-500 text-white hover:bg-gray-200 py-1 px-3;
}
</style>
