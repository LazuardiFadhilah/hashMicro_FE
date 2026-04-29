import axiosInstance from './axiosInstance';

export const getAll = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`/api/students?page=${page}&limit=${limit}`);
  return response.data;
};

export const create = async (data) => {
  const response = await axiosInstance.post('/api/students', data);
  return response.data;
};

export const update = async (id, data) => {
  const response = await axiosInstance.put(`/api/students/${id}`, data);
  return response.data;
};

export const softDelete = async (id) => {
  const response = await axiosInstance.delete(`/api/students/${id}`);
  return response.data;
};
