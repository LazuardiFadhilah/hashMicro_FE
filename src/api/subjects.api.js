import axiosInstance from './axiosInstance';

export const getAll = async () => {
  const response = await axiosInstance.get('/api/subjects');
  return response.data;
};
