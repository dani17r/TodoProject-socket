<script setup lang="ts">
import { useRoute } from "vue-router";
import Icons from "@components/icons";

const route = useRoute();

const projectId = route.params.id;
const domine = window.location.origin;
const urlShare = `${domine}/share/project/${projectId}`;

const copyToClipboard = () => navigator.clipboard.writeText(urlShare);
</script>

<template>
  <div class="flex items-center mb-4">
    <div class="w-full" @click="copyToClipboard()">
      <input type="text" class="input" disabled :value="urlShare" />
    </div>
    <a :href="urlShare" target="_blank" class="pl-3">
      <Icons.OpenIn />
    </a>
  </div>
</template>
