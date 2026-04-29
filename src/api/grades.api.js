import axiosInstance from './axiosInstance';

export const assign = async (data) => {
  const response = await axiosInstance.post('/api/grades', data);
  return response.data;
};

export const getReport = async () => {
  const response = await axiosInstance.get('/api/grades/report');
  return response.data;
};
