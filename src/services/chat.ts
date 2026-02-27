import http from './http';
import type { ChatMessage, ChatRequest, SearchResponse, SessionItem } from '../types/chat';

export async function chatV1(payload: ChatRequest) {
  const { data } = await http.post<ChatMessage>('/api/chat/v1', payload);
  return data;
}

export async function chatV2(payload: ChatRequest) {
  const { data } = await http.post<ChatMessage>('/api/chat/v2', payload);
  return data;
}

export async function getMessages(sessionId: number | string) {
  const { data } = await http.get<ChatMessage[]>('/api/chat/messages', {
    params: { sessionId },
  });
  return data;
}

export async function listRecentSessions() {
  const { data } = await http.get<SessionItem[]>('/api/chat/sessions/recent');
  return data;
}

export async function createSession(title: string) {
  const { data } = await http.post<SessionItem>('/api/chat/sessions', { title });
  return data;
}

export async function searchSessions(keyword: string, page = 0, size = 10) {
  const { data } = await http.get<SearchResponse>('/api/chat/search', {
    params: { keyword, page, size },
  });
  return data;
}
