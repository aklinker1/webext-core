<template>
  <div class="ContributorList">
    <a
      v-for="user in contributors"
      :key="user.id"
      :href="user.html_url"
      target="_blank"
      :title="user.login"
    >
      <img :src="user.avatar_url" />
      <p>{{ user.login }}</p>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const contributors = ref([]);

fetch('https://api.github.com/repos/aklinker1/webext-core/contributors', {
  headers: {},
}).then(async res => {
  contributors.value = await res.json();
});
</script>

<style scoped>
.ContributorList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.ContributorList a {
  width: 114px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 16px;
  transition: all;
  gap: 8px;
}
.ContributorList a:hover {
  background-color: var(--vp-sidebar-bg-color);
}
.ContributorList img {
  aspect-ratio: 1/1;
  border-radius: 100%;
}
.ContributorList p {
  width: 100%;
  text-align: center;
  padding: 0;
  margin: 0;
  font-size: small;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
