const { Agent, Client, Order, Manager, Contractor, Subagent, SubagentPayer, Country } = require('./entities');

const associateModels = () => {
  // Связь "Заявка" и "Агенты"
  Order.belongsToMany(Agent, { through: 'OrderAgents', as: 'agents', onDelete: 'CASCADE' });
  Agent.belongsToMany(Order, { through: 'OrderAgents', as: 'orders', onDelete: 'CASCADE' });

  // Связь "Заявка" и "Клиенты"
  Order.belongsToMany(Client, { through: 'OrderClients', as: 'clients', onDelete: 'CASCADE' });
  Client.belongsToMany(Order, { through: 'OrderClients', as: 'orders', onDelete: 'CASCADE' });

  // Связь "Заявка" и "Контрагенты"
  Order.belongsToMany(Contractor, { through: 'OrderContractors', as: 'contractors', onDelete: 'CASCADE' });
  Contractor.belongsToMany(Order, { through: 'OrderContractors', as: 'orders', onDelete: 'CASCADE' });

  // Связь "Заявка" и "Субагенты"
  Order.belongsToMany(Subagent, { through: 'OrderSubagents', as: 'subagents', onDelete: 'CASCADE' });
  Subagent.belongsToMany(Order, { through: 'OrderSubagents', as: 'orders', onDelete: 'CASCADE' });

  // Связь "Субагенты" и "Плательщики субагентов"
  Subagent.belongsTo(SubagentPayer, { foreignKey: 'subagentPayerId', as: 'payer', onDelete: 'CASCADE' });
  SubagentPayer.hasMany(Subagent, { foreignKey: 'subagentPayerId', as: 'subagents', onDelete: 'CASCADE' });

  // Связь "Заявка" и "Менеджеры"
  Order.belongsToMany(Manager, { through: 'OrderManagers', as: 'managers', onDelete: 'CASCADE' });
  Manager.belongsToMany(Order, { through: 'OrderManagers', as: 'orders', onDelete: 'CASCADE' });

  // Связь "Заявка" и "Проверяющие"
  Order.belongsToMany(Manager, { through: 'OrderReviewers', as: 'reviewers', onDelete: 'CASCADE' });
  Manager.belongsToMany(Order, { through: 'OrderReviewers', as: 'reviews', onDelete: 'CASCADE' });

  // Связь "Заявка" и "Страны"
  Order.belongsTo(Country, { foreignKey: 'country_id', as: 'country', onDelete: 'CASCADE' });
  Country.hasMany(Order, { foreignKey: 'country_id', as: 'orders', onDelete: 'CASCADE' });

  // Связь "Заявка" и "Плательщики субагентов"
  Order.belongsTo(SubagentPayer, { foreignKey: 'subagent_payer_id', as: 'subagentPayers', onDelete: 'CASCADE' });
  SubagentPayer.hasMany(Order, { foreignKey: 'subagent_payer_id', as: 'orders', onDelete: 'CASCADE' });
};

module.exports = { associateModels };
