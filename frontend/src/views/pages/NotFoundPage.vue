<script setup lang="ts">
// project libraries
import icons from "@components/icons";
</script>

<template>
  <section class="color-page">
    <div class="content-not-fount">
      <div class="wf-ull lg:w-1/2">
        <h1 class="text-main">Page not found</h1>
        <p class="text-content">
          Sorry, the page you are looking for doesn't exist.Here are some
          helpful links:
        </p>

        <div class="content-btns">
          <button class="btn-go-back" @click="$router.go(-1)">
            <icons.Back viewBox="5 0 30 22" class="h-4" />

            <span>Go back</span>
          </button>

          <button class="btn-home" @click="$router.push({ name: 'home' })">
            Take me home
          </button>
        </div>
      </div>

      <div class="content-img">
        <img class="img-not-fount" src="/404.svg" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.color-page {
  @apply bg-white dark:bg-zinc-800;
}

.btn-home {
  @apply w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600;
}

.text-content {
  @apply mt-4 text-zinc-500 dark:text-zinc-400;
}

.text-main {
  @apply mt-3 text-2xl font-semibold text-zinc-800 dark:text-white md:text-3xl;
}

.btn-go-back {
  @apply flex items-center justify-center w-1/2 px-5 py-2 text-sm text-zinc-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-100 dark:text-zinc-200 dark:border-zinc-700;
}

.content-btns {
  @apply flex items-center mt-6 gap-x-3;
}

.content-not-fount {
  @apply container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12;
}

.content-img {
  @apply relative w-full mt-12 lg:w-1/2 lg:mt-0;
}

.img-not-fount {
  @apply w-full max-w-lg lg:mx-auto;
}
</style>
