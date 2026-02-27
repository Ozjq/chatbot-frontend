<script setup lang="ts">
const keyword = defineModel<string>('keyword', { required: true });
const emit = defineEmits<{ search: [] }>();
</script>

<template>
  <div class="search-box">
    <el-input v-model="keyword" placeholder="输入关键词搜索会话" @keyup.enter="emit('search')" clearable />
    <el-button type="primary" @click="emit('search')">搜索</el-button>
  </div>
</template>

<style scoped>
.search-box {
  display: flex;
  gap: 8px;
}
</style>
