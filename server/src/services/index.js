const AgentService = require('./agentService');
const ClientService = require('./clientService');
const ContractorService = require('./contractorService');
const ManagerService = require('./managerService');
const OrderService = require('./orderService');
const SubagentService = require('./subagentServices');
const SubagentPayerService = require('./subagentPayerService');
const CountryService = require('./countryService');

// Экспортируем все сервисы в один объект
module.exports = {
  agentService: AgentService,
  clientService: ClientService,
  contractorService: ContractorService,
  managerService: ManagerService,
  orderService: OrderService,
  subagentService: SubagentService,
  subagentPayerService: SubagentPayerService,
  countryService: CountryService
};
