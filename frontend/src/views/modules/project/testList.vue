<template>
    <img :src="movie.img" alt="movie image">
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const movie = ref({ img: '' });

    const getMovie = async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        movie.value = {
            img: 'https://images.unsplash.com/photo-1691851004542-adebba3310d5?auto=format&fit=crop&q=80&w=1694&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
    }
    
    await getMovie();
</script>