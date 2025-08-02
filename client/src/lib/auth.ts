import api from './api';

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    fullName: string;
    email: string;
    _id: string;
  };
  token: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('/register', data);
  return res.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('/login', data);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};