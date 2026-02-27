<script setup lang="ts">
import { computed } from 'vue';
import { useChatStore } from '../stores/chat';

const chatStore = useChatStore();
const currentMode = computed({
  get: () => chatStore.mode,
  set: (value) => chatStore.setMode(value),
});
</script>

<template>
  <el-segmented
    v-model="currentMode"
    :options="[
      { label: 'RAG (v1)', value: 'v1' },
      { label: '普通对话 (v2)', value: 'v2' },
    ]"
  />
</template>
