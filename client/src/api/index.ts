import axios from 'axios';
import type { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '1'
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

export const api = {
  orders: {
    getAll: () => axiosInstance.get('/orders'),
    getById: (id: number) => axiosInstance.get(`/orders/${id}`),
    create: (data: any) => axiosInstance.post('/orders', data),
    update: (id: number, data: any) => axiosInstance.put(`/orders/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/orders/${id}`),
  },
  managers: {
    getAll: () => axiosInstance.get('/managers'),
    getById: (id: number) => axiosInstance.get(`/managers/${id}`),
    create: (data: any) => axiosInstance.post('/managers', data),
    update: (id: number, data: any) => axiosInstance.put(`/managers/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/managers/${id}`),
  },
  reviewers: {
    getAll: () => axiosInstance.get('/managers'),
    getById: (id: number) => axiosInstance.get(`/managers/${id}`),
    create: (data: any) => axiosInstance.post('/managers', data),
    update: (id: number, data: any) => axiosInstance.put(`/managers/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/managers/${id}`),
  },
  contractors: {
    getAll: () => axiosInstance.get('/contractors'),
    getById: (id: number) => axiosInstance.get(`/contractors/${id}`),
    create: (data: any) => axiosInstance.post('/contractors', data),
    update: (id: number, data: any) => axiosInstance.put(`/contractors/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/contractors/${id}`),
  },
  agents: {
    getAll: () => axiosInstance.get('/agents'),
    getById: (id: number) => axiosInstance.get(`/agents/${id}`),
    create: (data: any) => axiosInstance.post('/agents', data),
    update: (id: number, data: any) => axiosInstance.put(`/agents/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/agents/${id}`),
  },
  clients: {
    getAll: () => axiosInstance.get('/clients'),
    getById: (id: number) => axiosInstance.get(`/clients/${id}`),
    create: (data: any) => axiosInstance.post('/clients', data),
    update: (id: number, data: any) => axiosInstance.put(`/clients/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/clients/${id}`),
  },
  countries: {
    getAll: () => axiosInstance.get('/countries'),
    getById: (id: number) => axiosInstance.get(`/countries/${id}`),
    create: (data: any) => axiosInstance.post('/countries', data),
    update: (id: number, data: any) => axiosInstance.put(`/countries/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/countries/${id}`),
  },
  subagents: {
    getAll: () => axiosInstance.get('/subagents'),
    getById: (id: number) => axiosInstance.get(`/subagents/${id}`),
    create: (data: any) => axiosInstance.post('/subagents', data),
    update: (id: number, data: any) => axiosInstance.put(`/subagents/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/subagents/${id}`),
  },
  subagentPayers: {
    getAll: () => axiosInstance.get('/subagent-payers'),
    getById: (id: number) => axiosInstance.get(`/subagent-payers/${id}`),
    create: (data: any) => axiosInstance.post('/subagent-payers', data),
    update: (id: number, data: any) => axiosInstance.put(`/subagent-payers/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/subagent-payers/${id}`),
  },
  reviwers: {
    getAll: () => axiosInstance.get('/reviwers'),
    getById: (id: number) => axiosInstance.get(`/reviwers/${id}`),
    create: (data: any) => axiosInstance.post('/reviwers', data),
    update: (id: number, data: any) => axiosInstance.put(`/reviwers/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/reviwers/${id}`),
  },
  files: {
    getByOrderId: (orderId: number) => axiosInstance.get(`/files/order/${orderId}`),
    uploadMultiple: (formData: FormData) => axiosInstance.post(`/files/upload-multiple`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'ngrok-skip-browser-warning': '1'
      },
    }),
    deleteById: (fileId: string) => axiosInstance.delete(`/files/id/${fileId}`),
    updateById: (fileId: string, data: { originalname: string }) => axiosInstance.put(`/files/${fileId}`, data),
  },
};
