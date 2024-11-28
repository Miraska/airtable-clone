const { Agent, Client, Order, Manager, Contractor, Subagent, SubagentPayer, Country } = require('./entities');

const associateModels = () => {
  // Связи "Заявка" и "Агенты"
  Order.belongsToMany(Agent, { through: 'OrderAgents', as: 'agents' });
  Agent.belongsToMany(Order, { through: 'OrderAgents', as: 'orders' });

  // Связи "Заявка" и "Клиенты"
  Order.belongsToMany(Client, { through: 'OrderClients', as: 'clients' });
  Client.belongsToMany(Order, { through: 'OrderClients', as: 'orders' });

  // Связи "Заявка" и "Контрагенты"
  Order.belongsToMany(Contractor, { through: 'OrderContractors', as: 'contractors' });
  Contractor.belongsToMany(Order, { through: 'OrderContractors', as: 'orders' });

  // Связи "Заявка" и "Субагенты"
  Order.belongsToMany(Subagent, { through: 'OrderSubagents', as: 'subagents' });
  Subagent.belongsToMany(Order, { through: 'OrderSubagents', as: 'orders' });

  // Связь между "Субагентами" и "Плательщиками субагентов"
  Subagent.belongsTo(SubagentPayer, { foreignKey: 'subagentPayerId', as: 'payer' });
  SubagentPayer.hasMany(Subagent, { foreignKey: 'subagentPayerId', as: 'subagents' });

  // Ассоциации "Заявка" и "Менеджеры" (и проверяющие)
  Order.belongsToMany(Manager, { through: 'OrderManagers', as: 'managers' });
  Manager.belongsToMany(Order, { through: 'OrderManagers', as: 'orders' });

  Order.belongsToMany(Manager, { through: 'OrderReviewers', as: 'reviewers' });
  Manager.belongsToMany(Order, { through: 'OrderReviewers', as: 'reviews' });

  // Ассоциации "Заявка" и "Страны"
  Order.belongsTo(Country, { foreignKey: 'country_id', as: 'country' });
  Country.hasMany(Order, { foreignKey: 'country_id', as: 'orders' });
};

module.exports = {
  associateModels,
};
