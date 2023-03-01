<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  type: 'manifest' | 'browser' | 'testing-framework';
  text: string;
  unsupported?: boolean;
}>();

const title = computed(() => {
  if (props.unsupported && props.type === 'manifest') return `Does not work with ${props.text}`;
  if (props.unsupported) return `Does not support ${props.text}`;

  if (props.type === 'manifest') return `Works with ${props.text}`;
  return `Supports ${props.text}`;
});
</script>

<template>
  <p class="Chip" :class="{ unsupported }" :title="title">
    <svg
      v-if="unsupported"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
      />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83L9 20.42Z"
      />
    </svg>
    <span>{{ text }}</span>
  </p>
</template>

<style scoped>
.Chip {
  --chip-bg: var(--vp-c-brand-dimm);
  --chip-text: var(--vp-c-brand);
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0px 12px;
  border-radius: 9999px;
  background-color: var(--chip-bg);
  color: var(--chip-text);
  font-size: 12px;
  font-weight: bold;
  user-select: none;
  border: 1px solid var(--chip-bg);
}
.Chip.unsupported {
  --chip-bg: rgba(250, 52, 82, 0.12);
  --chip-text: rgb(250, 52, 82);
}
</style>
