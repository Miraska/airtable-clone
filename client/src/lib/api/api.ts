import axios from "axios"
import {IAgent, IClient, IContragent, ICountry, IManager, IOrder, ISubagent, ISubagentPayer} from "../../interface/interface"

const API_URL = "https://5e20-89-110-76-58.ngrok-free.app/api"
const AXIOS_HEADER = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "1",
}

const instance = axios.create({
  baseURL: API_URL,
  headers: AXIOS_HEADER,
})

export const api = {
  orders: {
    getAll: async () => await instance.get("/orders"),
    create: async (data: IOrder) => await instance.post("/orders", data),
    update: async (id: number, data: IOrder) => await instance.put(`/orders/${id}`, data),
    delete: async (id: number) => await instance.delete(`/orders/${id}`),
  },
  managers: {
    getAll: async () => await instance.get("/managers"),
    create: async (data: IManager) => await instance.post("/managers", data),
    update: async (id: number, data: IManager) => await instance.put(`/managers/${id}`, data),
    delete: async (id: number) => await instance.delete(`/managers/${id}`),
  },
  contractors: {
    getAll: async () => await instance.get("/contractors"),
    create: async (data: IContragent) => await instance.post("/contractors", data),
    update: async (id: number, data: IContragent) => await instance.put(`/contractors/${id}`, data),
    delete: async (id: number) => await instance.delete(`/contractors/${id}`),
  },
  agents: {
    getAll: async () => await instance.get("/agents"),
    create: async (data: IAgent) => await instance.post("/agents", data),
    update: async (id: number, data: IAgent) => await instance.put(`/agents/${id}`, data),
    delete: async (id: number) => await instance.delete(`/agents/${id}`),
  },
  clients: {
    getAll: async () => await instance.get("/clients"),
    create: async (data: IClient) => await instance.post("/clients", data),
    update: async (id: number, data: IClient) => await instance.put(`/clients/${id}`, data),
    delete: async (id: number) => await instance.delete(`/clients/${id}`),
  },
  countries: {
    getAll: async () => await instance.get("/countries"),
    create: async (data: ICountry) => await instance.post("/countries", data),
    update: async (id: number, data: ICountry) => await instance.put(`/countries/${id}`, data),
    delete: async (id: number) => await instance.delete(`/countries/${id}`),
  },
  subagents: {
    getAll: async () => await instance.get("/subagents"),
    create: async (data: ISubagent) => await instance.post("/subagents", data),
    update: async (id: number, data: ISubagent) => await instance.put(`/subagents/${id}`, data),
    delete: async (id: number) => await instance.delete(`/subagents/${id}`),
  },
  subagentPayers: {
    getAll: async () => await instance.get("/subagent-payers"),
    create: async (data: ISubagentPayer) => await instance.post("/subagent-payers", data),
    update: async (id: number, data: ISubagentPayer) => await instance.put(`/subagent-payers/${id}`, data),
    delete: async (id: number) => await instance.delete(`/subagent-payers/${id}`),
  },
}
