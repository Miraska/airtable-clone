import axios from "axios";
import { ISubagent } from "../interface/interface";

const API_URL = "https://a79b-178-207-95-61.ngrok-free.app/api"

export const api = {
  subagent: {
    getAll: () => axios.get(`${API_URL}/subagents`),
    create: (data: ISubagent) => axios.post(`${API_URL}/subagents`, data),
    update: (id: number, data: ISubagent) => axios.put(`${API_URL}/subagents/${id}`, data),
    delete: (id: number) => axios.delete(`${API_URL}/subagents/${id}`),
  }
}