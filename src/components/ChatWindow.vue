<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useChatStore } from '../stores/chat';
import MessageBubble from './MessageBubble.vue';
import ModeToggle from './ModeToggle.vue';

const chatStore = useChatStore();
const input = ref('');
const canSend = computed(() => input.value.trim().length > 0 && !chatStore.sending);

async function handleSend() {
  if (!canSend.value) return;

  const content = input.value;
  input.value = '';
  try {
    await chatStore.sendMessage(content);
  } catch {
    ElMessage.error('发送失败，请检查网络或登录状态。');
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    void handleSend();
  }
}
</script>

<template>
  <div class="chat-window">
    <div class="chat-toolbar">
      <ModeToggle />
    </div>

    <div class="messages" v-loading="chatStore.loadingMessages">
      <el-empty v-if="!chatStore.messages.length" description="开始发送第一条消息吧" />
      <MessageBubble v-for="item in chatStore.messages" :key="item.id ?? `${item.role}-${item.createdAt}`" :message="item" />
    </div>

    <div class="composer">
      <el-input
        v-model="input"
        type="textarea"
        :rows="3"
        resize="none"
        placeholder="请输入问题，Enter 发送，Shift+Enter 换行"
        @keydown="onKeydown"
      />
      <el-button type="primary" :loading="chatStore.sending" :disabled="!canSend" @click="handleSend">发送</el-button>
    </div>
  </div>
</template>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-toolbar {
  padding: 12px;
  border-bottom: 1px solid #ebeef5;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #fff;
}

.composer {
  border-top: 1px solid #ebeef5;
  padding: 12px;
  display: grid;
  gap: 8px;
}
</style>
