<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <pre>{{
    JSON.stringify({ path: route.path, params: route.params, query: route.query }, null, 2)
  }}</pre>
  <ul>
    <li><router-link to="/">/</router-link></li>
    <li><router-link to="/page-2">/page-2</router-link></li>
    <li><router-link to="/page-3">/page-3</router-link></li>
  </ul>
</template>
