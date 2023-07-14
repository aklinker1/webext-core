<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <pre>{{
    JSON.stringify({ path: route.path, params: route.params, query: route.query }, null, 2)
  }}</pre>

  <router-link to="/">/</router-link>
  <br />
  <router-link to="/page-2">/page-2</router-link>
  <br />
  <router-link to="/page-3">/page-3</router-link>
</template>
