import axiosInstance from './axiosInstance';

export const check = async (input1, input2, type) => {
  const response = await axiosInstance.post('/api/checker', { input1, input2, type });
  return response.data;
};
