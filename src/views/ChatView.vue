<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import SessionList from '../components/SessionList.vue';
import ChatWindow from '../components/ChatWindow.vue';

const router = useRouter();
const authStore = useAuthStore();

async function onLogout() {
  authStore.logout();
  await router.push('/login');
}
</script>

<template>
  <div class="chat-page">
    <header class="header">
      <h2>智能客服</h2>
      <div class="actions">
        <el-button @click="router.push('/search')">会话搜索</el-button>
        <el-button type="danger" plain @click="onLogout">退出登录</el-button>
      </div>
    </header>

    <main class="layout">
      <aside class="left"><SessionList /></aside>
      <section class="right"><ChatWindow /></section>
    </main>
  </div>
</template>

<style scoped>
.chat-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  height: 60px;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background: #fff;
}

.actions {
  display: flex;
  gap: 8px;
}

.layout {
  flex: 1;
  display: grid;
  grid-template-columns: 280px 1fr;
  overflow: hidden;
}

.left,
.right {
  min-height: 0;
}
</style>
