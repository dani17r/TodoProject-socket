<script setup lang="ts">
import Icons from "@components/icons";

interface PropsI {
  projectId: string;
}

const props = withDefaults(defineProps<PropsI>(), {
  projectId: "",
});

const domine = window.location.origin;
const urlShare = `${domine}/share/project/${props.projectId}`;

const copyToClipboard = () => navigator.clipboard.writeText(urlShare);
</script>

<template>
  <div class="flex items-center mb-4">
    <div class="w-full" @click="copyToClipboard()">
      <input type="text" class="input" disabled :value="urlShare" />
    </div>
    <a :href="urlShare" target="_blank" class="pl-2">
      <Icons.OpenIn />
    </a>
  </div>
</template>
