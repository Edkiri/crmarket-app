<template>HOLA</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const router = useRoute();
console.log(router.params.slug_name);
</script>
