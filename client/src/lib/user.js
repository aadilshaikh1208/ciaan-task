import api from './api';

export const getProfile = async (token) => {
    const res = await api.get('/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

export const getUserById = async (id) => {
    const res = await api.get(`/user/${id}`);
    return res.data;
};