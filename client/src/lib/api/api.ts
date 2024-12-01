import axios from 'axios';
import { IOrder } from '../interface/interface';

const API_URL = 'https://5e20-89-110-76-58.ngrok-free.app/api';
const AXIOS_HEADER = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': '1'
}

export const api = {
  orders: {
    getAll: () => axios.get('/orders', ),
    create: (data: IOrder) => axios.post('/orders', AXIOS_HEADER, data),
    update: (id: number, data:) => axios.put(`/orders/${id}`),
    delete: (id: number) => axios.delete(`/orders/${id}`),
  },
  managers: {
    getAll: () => axios.get('/managers'),
    create: () => axios.post('/managers', ),
    update: (id: number, ) => axios.put(`/managers/${id}`, ),
    delete: (id: number) => axios.delete(`/managers/${id}`),
  },
  contractors: {
    getAll: () => axios.get('/contractors'),
    create: () => axios.post('/contractors', ),
    update: (id: number, ) => axios.put(`/contractors/${id}`, ),
    delete: (id: number) => axios.delete(`/contractors/${id}`),
  },
  agents: {
    getAll: () => axios.get('/agents'),
    create: () => axios.post('/agents', ),
    update: (id: number, ) => axios.put(`/agents/${id}`, ),
    delete: (id: number) => axios.delete(`/agents/${id}`),
  },
  clients: {
    getAll: () => axios.get('/clients'),
    create: () => axios.post('/clients', ),
    update: (id: number, ) => axios.put(`/clients/${id}`, ),
    delete: (id: number) => axios.delete(`/clients/${id}`),
  },
  countries: {
    getAll: () => axios.get('/countries'),
    create: () => axios.post('/countries', ),
    update: (id: number, ) => axios.put(`/countries/${id}`, ),
    delete: (id: number) => axios.delete(`/countries/${id}`),
  },
  subagents: {
    getAll: () => axios.get('/subagents'),
    create: () => axios.post('/subagents', ),
    update: (id: number, ) => axios.put(`/subagents/${id}`, ),
    delete: (id: number) => axios.delete(`/subagents/${id}`),
  },
  subagentPayers: {
    getAll: () => axios.get('/subagent-payers'),
    create: () => axios.post('/subagent-payers', ),
    update: (id: number, ) => axios.put(`/subagent-payers/${id}`, ),
    delete: (id: number) => axios.delete(`/subagent-payers/${id}`),
  },
};