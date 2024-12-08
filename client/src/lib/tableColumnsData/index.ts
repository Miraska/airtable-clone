import columnsOrder from "./columnsOrder";
import columnsManager from "./columnsManager";
import columnsContractor from "./columnsContractor";
import columnsAgent from "./columnsAgent";
import columnsClient from "./columnsClient";
import columnsCountry from "./columnsCountry";
import columnsSubagent from "./columnsSubagent";
import columnsSubagentPayer from "./columnsSubagentPayer";

import { api } from "../../api/index";

export default {
  orders: {
    columns: columnsOrder,
    apiMethod: api.orders.getById,
    label: 'Заявки'
  },
  managers: {
    columns: columnsManager,
    apiMethod: api.managers.getById,
    label: 'Менеджеры'
  },
  contractors: {
    columns: columnsContractor,
    apiMethod: api.contractors.getById,
    label: 'Контрагент'

  },
  agents: {
    columns: columnsAgent,
    apiMethod: api.agents.getById,
    label: 'Агенты'
  },
  clients: {
    columns: columnsClient,
    apiMethod: api.clients.getById,
    label: 'Клиенты'
  },
  countries: {
    columns: columnsCountry,
    apiMethod: api.countries.getById,
    label: 'Страны'
  },
  subagents: {
    columns: columnsSubagent,
    apiMethod: api.subagents.getById,
    label: 'Субагенты'
  },
  subagentPayers: {
    columns: columnsSubagentPayer,
    apiMethod: api.subagentPayers.getById,
    label: 'Плательщики Субагентов'
  }
};
