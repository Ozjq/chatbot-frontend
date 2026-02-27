# 智能客服前端（Vue3 + Vite + TypeScript）

一个可直接对接 Spring Boot 后端的智能客服前端工程，内置 JWT 鉴权、会话管理、RAG/普通对话模式切换、会话搜索分页等能力。

## 技术栈

- Vue 3
- Vite
- TypeScript
- Pinia
- Vue Router
- Axios
- Element Plus

## 功能概览

- 登录 `/login`、注册 `/register`
- 聊天 `/chat`
  - 左侧最近会话列表
  - 右侧消息窗口与输入框
  - Enter 发送、Shift+Enter 换行
  - 乐观更新（先显示用户消息，再请求后端）
  - 模式切换：`RAG(v1)` / `普通(v2)`
- 搜索 `/search`
  - 按关键字搜索会话
  - 分页展示结果

## 鉴权说明（严格按后端 JWT Filter）

- token 来源：`POST /api/user/login` 返回 `{ token }`
- token 持久化：`localStorage` 中 `key=token`
- Pinia 同步保存 token
- Axios request interceptor：自动注入
  - `Authorization: Bearer <token>`
- Axios response interceptor：遇到 `401/403`
  - 清除 Pinia + localStorage token
  - 自动跳转 `/login`

## API 对接

已封装在 `src/services/`：

- `user.ts`
  - `login`
  - `register`
- `chat.ts`
  - `chatV1`
  - `chatV2`
  - `getMessages`
  - `listRecentSessions`
  - `createSession`
  - `searchSessions`
- `http.ts`
  - Axios 实例和拦截器

## 快速开始

```bash
npm install
npm run dev
```

默认访问：`http://localhost:5173`

## 环境变量配置

项目根目录 `.env`：

```env
VITE_API_BASE_URL=http://localhost:8080
```

> 如后端地址变化，修改该值后重启前端开发服务。

## 目录结构

```text
src/
  components/
    ChatWindow.vue
    MessageBubble.vue
    ModeToggle.vue
    SearchBox.vue
    SessionList.vue
  router/
    index.ts
  services/
    chat.ts
    http.ts
    user.ts
  stores/
    auth.ts
    chat.ts
  types/
    chat.ts
  views/
    ChatView.vue
    LoginView.vue
    RegisterView.vue
    SearchView.vue
  App.vue
  main.ts
  style.css
```

## 常见问题

### 1）401 未授权

常见原因：

- 未登录（未携带 token）
- token 过期
- token 格式错误（非 Bearer）

本项目在收到 401/403 时会自动清空登录状态并跳转登录页。

### 2）跨域（CORS）

若浏览器报跨域，请在 Spring Boot 后端开启对应前端域名的 CORS（例如 `http://localhost:5173`）。

### 3）聊天消息 role=system 显示问题

前端已兼容：`role=system` 将按 assistant 气泡样式渲染。

---

如需扩展：可增加 markdown 渲染、会话重命名、消息流式输出（SSE/WebSocket）等。
