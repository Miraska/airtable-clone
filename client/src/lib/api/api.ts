import axios from "axios";
import { IAgent, IClient, IContragent, ICountry, IManager, IOrder, ISubagent, ISubagentPayer } from "../interface/interface";

const API_URL = "https://5e20-89-110-76-58.ngrok-free.app/api";
const AXIOS_HEADER = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "1",
};

const instance = axios.create({
  baseURL: API_URL,
  headers: AXIOS_HEADER,
});

export const api = {
  orders: {
    getAll: () => instance.get("/orders"),
    create: (data: IOrder) => instance.post("/orders", data),
    update: (id: number, data: IOrder) => instance.put(`/orders/${id}`, data),
    delete: (id: number) => instance.delete(`/orders/${id}`),
  },
  managers: {
    getAll: () => instance.get("/managers"),
    create: (data: IManager) => instance.post("/managers", data),
    update: (id: number, data: IManager) =>
      instance.put(`/managers/${id}`, data),
    delete: (id: number) => instance.delete(`/managers/${id}`),
  },
  contractors: {
    getAll: () => instance.get("/contractors"),
    create: (data: IContragent) => instance.post("/contractors", data),
    update: (id: number, data: IContragent) => instance.put(`/contractors/${id}`, data),
    delete: (id: number) => instance.delete(`/contractors/${id}`),
  },
  agents: {
    getAll: () => instance.get("/agents"),
    create: (data: IAgent) => instance.post("/agents", data),
    update: (id: number, data: IAgent) => instance.put(`/agents/${id}`, data),
    delete: (id: number) => instance.delete(`/agents/${id}`),
  },
  clients: {
    getAll: () => instance.get("/clients"),
    create: (data: IClient) => instance.post("/clients", data),
    update: (id: number, data: IClient) => instance.put(`/clients/${id}`, data),
    delete: (id: number) => instance.delete(`/clients/${id}`),
  },
  countries: {
    getAll: () => instance.get("/countries"),
    create: (data: ICountry) => instance.post("/countries", data),
    update: (id: number, data: ICountry) => instance.put(`/countries/${id}`, data),
    delete: (id: number) => instance.delete(`/countries/${id}`),
  },
  subagents: {
    getAll: () => instance.get("/subagents"),
    create: (data: ISubagent) => instance.post("/subagents", data),
    update: (id: number, data: ISubagent) => instance.put(`/subagents/${id}`, data),
    delete: (id: number) => instance.delete(`/subagents/${id}`),
  },
  subagentPayers: {
    getAll: () => instance.get("/subagent-payers"),
    create: (data: ISubagentPayer) => instance.post("/subagent-payers", data),
    update: (id: number, data: ISubagentPayer) => instance.put(`/subagent-payers/${id}`, data),
    delete: (id: number) => instance.delete(`/subagent-payers/${id}`),
  },
};
