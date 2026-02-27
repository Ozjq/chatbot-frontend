import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ChatView from '../views/ChatView.vue';
import SearchView from '../views/SearchView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/chat' },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
    { path: '/chat', component: ChatView, meta: { requiresAuth: true } },
    { path: '/search', component: SearchView, meta: { requiresAuth: true } },
  ],
});

router.beforeEach((to: { meta: { requiresAuth?: boolean }; path: string }) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    return '/login';
  }

  if ((to.path === '/login' || to.path === '/register') && token) {
    return '/chat';
  }

  return true;
});

export default router;
