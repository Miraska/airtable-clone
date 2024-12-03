import axios from 'axios';
import type { AxiosError } from 'axios';

const API_URL = 'https://e035-89-110-76-58.ngrok-free.app/api';

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
    getOne: (id: number) => axiosInstance.get(`/orders/${id}`),
    create: (data: any) => axiosInstance.post('/orders', data),
    update: (id: number, data: any) => axiosInstance.put(`/orders/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/orders/${id}`),
  },
  managers: {
    getAll: () => axiosInstance.get('/managers'),
    create: (data: any) => axiosInstance.post('/managers', data),
    update: (id: number, data: any) => axiosInstance.put(`/managers/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/managers/${id}`),
  },
  contractors: {
    getAll: () => axiosInstance.get('/contractors'),
    create: (data: any) => axiosInstance.post('/contractors', data),
    update: (id: number, data: any) => axiosInstance.put(`/contractors/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/contractors/${id}`),
  },
  agents: {
    getAll: () => axiosInstance.get('/agents'),
    create: (data: any) => axiosInstance.post('/agents', data),
    update: (id: number, data: any) => axiosInstance.put(`/agents/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/agents/${id}`),
  },
  clients: {
    getAll: () => axiosInstance.get('/clients'),
    create: (data: any) => axiosInstance.post('/clients', data),
    update: (id: number, data: any) => axiosInstance.put(`/clients/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/clients/${id}`),
  },
  countries: {
    getAll: () => axiosInstance.get('/countries'),
    create: (data: any) => axiosInstance.post('/countries', data),
    update: (id: number, data: any) => axiosInstance.put(`/countries/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/countries/${id}`),
  },
  subagents: {
    getAll: () => axiosInstance.get('/subagents'),
    create: (data: any) => axiosInstance.post('/subagents', data),
    update: (id: number, data: any) => axiosInstance.put(`/subagents/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/subagents/${id}`),
  },
  subagentPayers: {
    getAll: () => axiosInstance.get('/subagent-payers'),
    create: (data: any) => axiosInstance.post('/subagent-payers', data),
    update: (id: number, data: any) => axiosInstance.put(`/subagent-payers/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/subagent-payers/${id}`),
  },
};