<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const form = reactive({ username: '', password: '' });
const loading = reactive({ value: false });

async function submitLogin() {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入用户名和密码');
    return;
  }

  loading.value = true;
  try {
    await authStore.login(form.username, form.password);
    ElMessage.success('登录成功');
    await router.push('/chat');
  } catch {
    ElMessage.error('登录失败，请检查账号密码');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="auth-page">
    <el-card class="auth-card">
      <h2>登录智能客服系统</h2>
      <el-form @submit.prevent="submitLogin">
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-button type="primary" :loading="loading.value" class="w-full" @click="submitLogin">登录</el-button>
      </el-form>
      <p class="tips">没有账号？<router-link to="/register">去注册</router-link></p>
    </el-card>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #e0ecff, #f5f7fa);
}

.auth-card {
  width: 420px;
}

.w-full {
  width: 100%;
}

.tips {
  margin-top: 12px;
  text-align: center;
}
</style>
