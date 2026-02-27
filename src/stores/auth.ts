import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { login as loginApi } from '../services/user';

const TOKEN_KEY = 'token';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem(TOKEN_KEY) ?? '');

  const isAuthed = computed(() => Boolean(token.value));

  function setToken(value: string) {
    token.value = value;
    localStorage.setItem(TOKEN_KEY, value);
  }

  function clearToken() {
    token.value = '';
    localStorage.removeItem(TOKEN_KEY);
  }

  async function login(username: string, password: string) {
    const { token: nextToken } = await loginApi({ username, password });
    setToken(nextToken);
  }

  function logout() {
    clearToken();
  }

  return {
    token,
    isAuthed,
    login,
    logout,
    setToken,
    clearToken,
  };
});
