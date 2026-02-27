import http from './http';
import type { LoginResponse, UserCredentials } from '../types/chat';

export async function login(payload: UserCredentials) {
  const { data } = await http.post<LoginResponse>('/api/user/login', payload);
  return data;
}

export async function register(payload: UserCredentials) {
  const { data } = await http.post('/api/user/register', payload);
  return data;
}
