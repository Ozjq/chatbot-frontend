<script setup lang="ts">
import { onMounted } from 'vue';
import { useChatStore } from '../stores/chat';

const chatStore = useChatStore();

async function onCreateSession() {
  await chatStore.createAndSelectSession(`会话 ${chatStore.sessions.length + 1}`);
}

onMounted(() => {
  chatStore.fetchRecentSessions();
});
</script>

<template>
  <div class="session-list">
    <div class="header">
      <h3>最近会话</h3>
      <el-button type="primary" plain size="small" @click="onCreateSession">新建</el-button>
    </div>

    <el-skeleton v-if="chatStore.loadingSessions" :rows="5" animated />

    <el-empty v-else-if="!chatStore.sessions.length" description="暂无会话，点击新建开始聊天" />

    <el-menu
      v-else
      :default-active="String(chatStore.currentSessionId ?? '')"
      @select="chatStore.selectSession"
    >
      <el-menu-item v-for="session in chatStore.sessions" :key="session.id" :index="String(session.id)">
        <div class="session-title">{{ session.title || `会话 ${session.id}` }}</div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.session-list {
  height: 100%;
  padding: 12px;
  border-right: 1px solid #ebeef5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.session-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
