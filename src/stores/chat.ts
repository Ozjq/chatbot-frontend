import { ref } from 'vue';
import { defineStore } from 'pinia';
import { chatV1, chatV2, createSession, getMessages, listRecentSessions, searchSessions } from '../services/chat';
import type { ChatMessage, ChatMode, SessionItem } from '../types/chat';

export const useChatStore = defineStore('chat', () => {
  const mode = ref<ChatMode>('v1');
  const currentSessionId = ref<number | string | null>(null);
  const sessions = ref<SessionItem[]>([]);
  const messages = ref<ChatMessage[]>([]);
  const loadingSessions = ref(false);
  const loadingMessages = ref(false);
  const sending = ref(false);

  async function fetchRecentSessions() {
    loadingSessions.value = true;
    try {
      sessions.value = await listRecentSessions();
    } finally {
      loadingSessions.value = false;
    }
  }

  async function ensureSession() {
    if (currentSessionId.value) {
      return currentSessionId.value;
    }

    const created = await createSession('新会话');
    currentSessionId.value = created.id;
    sessions.value = [created, ...sessions.value];
    return created.id;
  }

  async function selectSession(sessionId: number | string) {
    currentSessionId.value = sessionId;
    loadingMessages.value = true;
    try {
      messages.value = await getMessages(sessionId);
    } finally {
      loadingMessages.value = false;
    }
  }

  async function sendMessage(content: string) {
    if (!content.trim()) return;

    const sessionId = await ensureSession();
    const userMsg: ChatMessage = {
      id: `local-${Date.now()}`,
      sessionId,
      role: 'user',
      content,
      optimistic: true,
    };
    messages.value.push(userMsg);
    sending.value = true;

    try {
      const botReply =
        mode.value === 'v1'
          ? await chatV1({ sessionId, message: content })
          : await chatV2({ sessionId, message: content });

      messages.value = messages.value.map((msg) =>
        msg.id === userMsg.id ? { ...msg, optimistic: false } : msg,
      );
      messages.value.push(botReply);
      await fetchRecentSessions();
    } catch (error) {
      messages.value.push({
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: '消息发送失败，请稍后重试。',
      });
      throw error;
    } finally {
      sending.value = false;
    }
  }

  async function createAndSelectSession(title: string) {
    const created = await createSession(title);
    sessions.value = [created, ...sessions.value];
    await selectSession(created.id);
  }

  async function querySessions(keyword: string, page = 0, size = 10) {
    return searchSessions(keyword, page, size);
  }

  function setMode(next: ChatMode) {
    mode.value = next;
  }

  return {
    mode,
    currentSessionId,
    sessions,
    messages,
    loadingSessions,
    loadingMessages,
    sending,
    fetchRecentSessions,
    selectSession,
    sendMessage,
    createAndSelectSession,
    querySessions,
    setMode,
  };
});
