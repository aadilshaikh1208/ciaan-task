import api from './api';
import { register as registerApi } from '@/lib/auth';

export interface UserProfile {
  user: {
    _id: string;
    fullName: string;
    email: string;
  };
}

export const getProfile = async (token: string): Promise<UserProfile> => {
  const res = await api.get<UserProfile>('/user/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getUserById = async (id: string): Promise<UserProfile> => {
  const res = await api.get<UserProfile>(`/user/${id}`);
  return res.data;
};