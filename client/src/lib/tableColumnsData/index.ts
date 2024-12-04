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
  },
  managers: {
    columns: columnsManager,
    apiMethod: api.managers.getById,
  },
  contractors: {
    columns: columnsContractor,
    apiMethod: api.contractors.getById,
  },
  agents: {
    columns: columnsAgent,
    apiMethod: api.agents.getById,
  },
  clients: {
    columns: columnsClient,
    apiMethod: api.clients.getById,
  },
  countries: {
    columns: columnsCountry,
    apiMethod: api.countries.getById,
  },
  subagents: {
    columns: columnsSubagent,
    apiMethod: api.subagents.getById,
  },
  payers: {
    columns: columnsSubagentPayer,
    apiMethod: api.subagentPayers.getById,
  }
};
