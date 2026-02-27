<script setup lang="ts">
import { computed } from 'vue';
import type { ChatMessage } from '../types/chat';

const props = defineProps<{ message: ChatMessage }>();

const normalizedRole = computed(() =>
  props.message.role === 'system' ? 'assistant' : props.message.role,
);
</script>

<template>
  <div :class="['bubble-row', normalizedRole]">
    <div class="bubble">
      <p>{{ message.content }}</p>
      <small v-if="message.optimistic">发送中...</small>
    </div>
  </div>
</template>

<style scoped>
.bubble-row {
  display: flex;
  margin-bottom: 12px;
}

.bubble-row.user {
  justify-content: flex-end;
}

.bubble-row.assistant {
  justify-content: flex-start;
}

.bubble {
  max-width: 70%;
  border-radius: 12px;
  padding: 10px 12px;
  line-height: 1.5;
  white-space: pre-wrap;
}

.user .bubble {
  background: #409eff;
  color: #fff;
}

.assistant .bubble {
  background: #f4f4f5;
  color: #303133;
}

small {
  display: block;
  margin-top: 4px;
  opacity: 0.75;
}
</style>
