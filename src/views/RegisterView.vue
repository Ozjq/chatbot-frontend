<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { register } from '../services/user';

const router = useRouter();
const form = reactive({ username: '', password: '' });
const loading = reactive({ value: false });

async function submitRegister() {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入用户名和密码');
    return;
  }

  loading.value = true;
  try {
    await register(form);
    ElMessage.success('注册成功，请登录');
    await router.push('/login');
  } catch {
    ElMessage.error('注册失败，请稍后重试');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="auth-page">
    <el-card class="auth-card">
      <h2>注册账号</h2>
      <el-form @submit.prevent="submitRegister">
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-button type="primary" :loading="loading.value" class="w-full" @click="submitRegister">注册</el-button>
      </el-form>
      <p class="tips">已有账号？<router-link to="/login">去登录</router-link></p>
    </el-card>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #eafaf1, #f5f7fa);
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
