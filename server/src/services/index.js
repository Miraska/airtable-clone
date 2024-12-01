const AgentService = require('./agentService');
const ClientService = require('./clientService');
const ContractorService = require('./contractorService');
const ManagerService = require('./managerService');
const reviewerService = require('./reviwerService');
const OrderService = require('./orderService');
const SubagentService = require('./subagentServices');
const SubagentPayerService = require('./subagentPayerService');
const CountryService = require('./countryService');

module.exports = {
  agentService: AgentService,
  clientService: ClientService,
  contractorService: ContractorService,
  managerService: ManagerService,
  reviewerService: reviewerService,
  orderService: OrderService,
  subagentService: SubagentService,
  subagentPayerService: SubagentPayerService,
  countryService: CountryService
};
