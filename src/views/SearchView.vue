<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import SearchBox from '../components/SearchBox.vue';
import { useChatStore } from '../stores/chat';
import type { SessionItem } from '../types/chat';

const router = useRouter();
const chatStore = useChatStore();
const keyword = ref('');
const loading = ref(false);
const result = reactive({
  items: [] as SessionItem[],
  total: 0,
  page: 0,
  size: 10,
});

async function load(page = 0) {
  loading.value = true;
  try {
    const data = await chatStore.querySessions(keyword.value, page, result.size);
    result.items = data.content;
    result.total = data.totalElements;
    result.page = data.number;
  } catch {
    ElMessage.error('搜索失败，请稍后再试');
  } finally {
    loading.value = false;
  }
}

async function openSession(sessionId: number | string) {
  await chatStore.selectSession(sessionId);
  await router.push('/chat');
}
</script>

<template>
  <div class="search-page">
    <header class="top">
      <h2>会话搜索</h2>
      <el-button @click="router.push('/chat')">返回聊天</el-button>
    </header>

    <SearchBox v-model:keyword="keyword" @search="load(0)" />

    <el-card class="mt" v-loading="loading">
      <el-empty v-if="!result.items.length" description="请输入关键词进行搜索" />
      <el-table v-else :data="result.items" stripe>
        <el-table-column prop="id" label="会话 ID" width="140" />
        <el-table-column prop="title" label="标题" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" @click="openSession(scope.row.id)">打开</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="mt"
        layout="prev, pager, next, total"
        :total="result.total"
        :page-size="result.size"
        :current-page="result.page + 1"
        @current-change="(p:number) => load(p - 1)"
      />
    </el-card>
  </div>
</template>

<style scoped>
.search-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.mt {
  margin-top: 16px;
}
</style>
