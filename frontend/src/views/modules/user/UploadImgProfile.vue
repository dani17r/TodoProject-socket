<script setup lang="ts">
import { ref, watchEffect } from "vue";

import Icons from "@components/icons";

const props = defineProps({
  clean: Boolean,
  preview: { type: String, default: "" },
});

const emits = defineEmits({
  update: (file: Blob) => file,
});

const previewImg = ref('');
const isFile = ref(new Blob());

const clickUploadImg = () => {
  document.getElementById("profile_img_upl")?.click();
};

const cleanFile = () => {
  isFile.value = new Blob();
  emits("update", isFile.value);
  previewImg.value = props.preview;
};

const previewImage = (event: Event) => {
  let input = event.target as HTMLInputElement;
  if (input.files) {
    let reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      previewImg.value = String(e.target?.result);
    };

    if (input.files[0]) {
      reader.readAsDataURL(input.files[0]);
      isFile.value = input.files[0];
      emits("update", isFile.value);
    }
  }
};

watchEffect(() => props.clean == true && cleanFile());
watchEffect(() => setTimeout(() => (previewImg.value = props.preview), 300));
</script>

<template>
  <input
    id="profile_img_upl"
    accept=".png, .jpeg, .webp, .jpg, tif, bmp, gif"
    class="hidden"
    type="file"
    @change="previewImage"
  />
  <div class="flex justify-center items-center bg-zinc-700 rounded-md relative h-[21vh]">
    <img :src="previewImg" class="image-profile" @click="clickUploadImg()" v-if="previewImg"/>
    <Icons.Loading v-else/>
    <Icons.Close
      v-show="isFile.size"
      class="btn-cancel-img-profile"
      @click="cleanFile()"
    />
  </div>
</template>

<style>
.image-profile {
  @apply w-[140px] h-[140px] rounded-full object-cover my-4;
}
.btn-cancel-img-profile {
  @apply absolute top-[130px] right-[130px] bg-red-500 rounded-full h-6 w-6 p-1;
}
</style>
