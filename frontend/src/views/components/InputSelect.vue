<script setup lang="ts">
import { reactive, ref } from "vue";

const options = reactive([
  { id: 1, label: "Opción 1" },
  { id: 2, label: "Opción 2" },
  { id: 3, label: "Opción 3" },
]);

const selectedOption = ref(null);

const selectOption = (option) => {
  selectedOption.value = option.label;
};

// const toggleList = () => {
//   const list = document.querySelector('ul');
//   list.style.display = list?.style.display === 'none' ? 'block' : 'none';
// }
</script>

<template>
  <div class="relative inline-block">
    <div
      class="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer"
    >
      <span class="text-gray-500">Selecciona una opción</span>
      <svg class="w-4 h-4 text-gray-500 fill-current" viewBox="0 0 20 20">
        <path d="M10 14l6-6H4z" />
      </svg>
    </div>
    <ul
      class="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-48"
    >
      <li
        v-for="option in options"
        :key="option.id"
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
