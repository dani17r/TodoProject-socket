<script setup lang="ts">
import { userStore } from "@stores/user";
import Icons from "@components/icons";
import { ref } from "vue";

const { user } = userStore();
const emits = defineEmits({
  update: (file: Blob) => file,
});

const imgDefault = `${import.meta.env.VITE_URL_UPLOAD}/${user.value?.image}`;
const preview = ref(imgDefault);
const isFile = ref(new Blob());

const clickUploadImg = () => {
  document.getElementById("profile_img_upl")?.click();
};

const cleanFile = () => {
  isFile.value = new Blob();
  preview.value = imgDefault;
  emits("update", isFile.value);
};

const previewImage = (event: Event) => {
  let input = event.target as HTMLInputElement;
  if (input.files) {
    let reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      preview.value = String(e.target?.result);
    };

    if (input.files[0]) {
      reader.readAsDataURL(input.files[0]);
      isFile.value = input.files[0];
      emits("update", isFile.value);
    }
  }
};
</script>

<template>
  <input
    id="profile_img_upl"
    accept=".png, .jpeg, .webp, .jpg, tif, bmp, gif"
    class="hidden"
    type="file"
    @change="previewImage"
  />
  <div class="flex justify-center bg-zinc-700 relative">
    <img :src="preview" class="image-profile" @click="clickUploadImg()" />
    <Icons.Close
      class="btn-cancel-img-profile"
      @click="cleanFile()"
      v-show="isFile.size"
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
