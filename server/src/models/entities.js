const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

// Агент
const Agent = sequelize.define('Agent', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

// Клиент
const Client = sequelize.define('Client', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  inn: { type: DataTypes.STRING, allowNull: true },
}, { timestamps: false });

// Заявка
const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  autonumber: { type: DataTypes.INTEGER, unique: true },
  status: { type: DataTypes.STRING, allowNull: false },
  order_number: { type: DataTypes.BIGINT, allowNull: false, unique: true }, // Change to BIGINT
  client_inn: { type: DataTypes.STRING, allowNull: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  date_hired: { type: DataTypes.DATEONLY, allowNull: true },
  name_agency: { type: DataTypes.STRING, allowNull: false },
  swift_code: { type: DataTypes.STRING, allowNull: true },
  calc_condition: { type: DataTypes.STRING, allowNull: true },
  type_transaction: { type: DataTypes.STRING, allowNull: true },
  number_receiving: { type: DataTypes.INTEGER, allowNull: true },
  date_instruction: { type: DataTypes.DATEONLY, allowNull: true },
  currency: { type: DataTypes.STRING, allowNull: true },
  sum_order: { type: DataTypes.FLOAT, allowNull: true },
  vip_commission: { type: DataTypes.FLOAT, allowNull: true },
  vip_condition: { type: DataTypes.STRING, allowNull: true },
  hide_commission: { type: DataTypes.FLOAT, allowNull: true },
  commision_plus_percent: { type: DataTypes.FLOAT, allowNull: true },
  commision_plus_accredit: { type: DataTypes.FLOAT, allowNull: true },
  commision_plus_escrow: { type: DataTypes.FLOAT, allowNull: true },
  money_rate: { type: DataTypes.FLOAT, allowNull: true },
  hide_money_rate: { type: DataTypes.FLOAT, allowNull: true },
  date_fixation_rate: { type: DataTypes.DATEONLY, allowNull: true },
  order_rate_rub: { type: DataTypes.STRING, allowNull: true },
  agency_award: { type: DataTypes.FLOAT, allowNull: true },
  real_award: { type: DataTypes.FLOAT, allowNull: true },
  not_ours_award: { type: DataTypes.FLOAT, allowNull: true },
  sum: { type: DataTypes.FLOAT, allowNull: true },
  letter_of_credit: { type: DataTypes.BOOLEAN, allowNull: true },
  take_first_doc: { type: DataTypes.BOOLEAN, allowNull: true },
  invoice: { type: DataTypes.STRING, allowNull: true },
  date_contract_signed: { type: DataTypes.DATEONLY, allowNull: true },
  date_reg_bank: { type: DataTypes.DATEONLY, allowNull: true },
  date_open_letter_of_credit: { type: DataTypes.DATEONLY, allowNull: true },
  date_valet_agency: { type: DataTypes.DATEONLY, allowNull: true },
  date_taking_agency: { type: DataTypes.DATEONLY, allowNull: true },
  date_paid_rub: { type: DataTypes.DATEONLY, allowNull: true },
  date_unhide_letter_of_credit: { type: DataTypes.DATEONLY, allowNull: true },
  date_sign_act: { type: DataTypes.DATEONLY, allowNull: true },
  date_close_deal: { type: DataTypes.DATEONLY, allowNull: true },
  cycle_deal: { type: DataTypes.INTEGER, allowNull: true },
  purpose_of_payment: { type: DataTypes.STRING, allowNull: true },
  serial_num_for_payer: { type: DataTypes.INTEGER, allowNull: true },
  date_docs_agent_and_subagent: { type: DataTypes.DATEONLY, allowNull: true },
  date_taking_swift: { type: DataTypes.DATEONLY, allowNull: true },
  date_get_swift103: { type: DataTypes.DATEONLY, allowNull: true },
  date_take_swift103: { type: DataTypes.DATEONLY, allowNull: true },
  date_get_swift199: { type: DataTypes.DATEONLY, allowNull: true },
  date_take_swift199: { type: DataTypes.DATEONLY, allowNull: true },
  date_refund: { type: DataTypes.DATEONLY, allowNull: true },
  date_take_refund: { type: DataTypes.DATEONLY, allowNull: true },
  status_swift: { type: DataTypes.STRING, allowNull: true },
  stuck_money: { type: DataTypes.BOOLEAN, defaultValue: true },
  stage_problem: { type: DataTypes.STRING, allowNull: true },
  comment_problem: { type: DataTypes.STRING, allowNull: true },
  stuck_money_name: { type: DataTypes.STRING, allowNull: true },
  stuck_money_sum: { type: DataTypes.FLOAT, allowNull: true },
  mistake_is_it_name: { type: DataTypes.STRING, allowNull: true },
  order: { type: DataTypes.STRING, allowNull: true },
  order_link: { type: DataTypes.STRING, allowNull: true },
  invoice: { type: DataTypes.STRING, allowNull: true },
  invoice_link: { type: DataTypes.STRING, allowNull: true },
  assignment: { type: DataTypes.STRING, allowNull: true },
  assignment_link: { type: DataTypes.STRING, allowNull: true },
  swift: { type: DataTypes.STRING, allowNull: true },
  swift_link: { type: DataTypes.STRING, allowNull: true },
  swift103: { type: DataTypes.STRING, allowNull: true },
  swift103_link: { type: DataTypes.STRING, allowNull: true },
  swift199: { type: DataTypes.STRING, allowNull: true },
  swift199_link: { type: DataTypes.STRING, allowNull: true },
  act: { type: DataTypes.STRING, allowNull: true },
  act_link: { type: DataTypes.STRING, allowNull: true },
  money_gone: { type: DataTypes.BOOLEAN, allowNull: true }
}, { timestamps: false });


const File = sequelize.define('File', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fileName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fileUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {timestamps: false});

// Менеджер
const Manager = sequelize.define('Manager', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  tel: { type: DataTypes.STRING, allowNull: true },
  date: { type: DataTypes.DATEONLY, allowNull: true },
}, { timestamps: false });

// Проверяющий
const Reviewer = sequelize.define('Reviewer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  tel: { type: DataTypes.STRING, allowNull: true },
  date: { type: DataTypes.DATEONLY, allowNull: true },
}, { timestamps: false });

// Контрагент
const Contractor = sequelize.define('Contractor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

// Субагент
const Subagent = sequelize.define('Subagent', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

// Плательщик субагента
const SubagentPayer = sequelize.define('SubagentPayer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });


// Страна
const Country = sequelize.define('Country', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: true },
  full_name: { type: DataTypes.STRING, allowNull: true },
}, { timestamps: false });

sequelize.sync({alter: true});

module.exports = {
  Agent,
  Client,
  Order,
  Manager,
  Contractor,
  Subagent,
  SubagentPayer,
  Country,
  Reviewer,
  File
};
