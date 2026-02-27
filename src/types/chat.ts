export type ChatMode = 'v1' | 'v2';

export interface UserCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SessionItem {
  id: number | string;
  title: string;
  updatedAt?: string;
}

export interface ChatMessage {
  id?: number | string;
  sessionId?: number | string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: string;
  optimistic?: boolean;
}

export interface ChatRequest {
  sessionId?: number | string;
  message: string;
}

export interface SearchResponse {
  content: SessionItem[];
  totalElements: number;
  number: number;
  size: number;
}
