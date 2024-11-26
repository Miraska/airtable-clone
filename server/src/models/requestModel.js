const db = require('../config/dbConfig');

// Создание новой заявки
const createRequest = async (data) => {
  const { rows } = await db.query(
    `INSERT INTO requests (
      autonumber, status, request_number, manager, reviewer, placement_date, hired, contractor,
      agent, client, client_inn, exporter_name, swift_code, country, payment_terms, transaction_type,
      receipt_number, currency, request_amount, bank_commission, accred_commission, exchange_rate,
      hidden_rate, rate_fixation_date, request_by_rate, agent_fee, actual_fee, total_amount,
      with_accreditor, primary_documents_received, invoice_issued, agent_signed, registered_in_bank,
      letter_of_credit_opened, currency_paid, letter_of_credit_released, report_signed,
      transaction_closed, payment_purpose, subagent, subagent_payer, sequential_number,
      agent_subagent_docs_prepared, swift_received, swift_status, request_link, invoice_link,
      instruction_link, swift_link, report_link, airtable_id
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22,
      $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41,
      $42, $43, $44, $45, $46, $47, $48, $49, $50, $51
    ) RETURNING *`,
    [
      data.autonumber, data.status, data.request_number, data.manager, data.reviewer, data.placement_date, data.hired, data.contractor,
      data.agent, data.client, data.client_inn, data.exporter_name, data.swift_code, data.country, data.payment_terms, data.transaction_type,
      data.receipt_number, data.currency, data.request_amount, data.bank_commission, data.accred_commission, data.exchange_rate,
      data.hidden_rate, data.rate_fixation_date, data.request_by_rate, data.agent_fee, data.actual_fee, data.total_amount,
      data.with_accreditor, data.primary_documents_received, data.invoice_issued, data.agent_signed, data.registered_in_bank,
      data.letter_of_credit_opened, data.currency_paid, data.letter_of_credit_released, data.report_signed,
      data.transaction_closed, data.payment_purpose, data.subagent, data.subagent_payer, data.sequential_number,
      data.agent_subagent_docs_prepared, data.swift_received, data.swift_status, data.request_link, data.invoice_link,
      data.instruction_link, data.swift_link, data.report_link, data.airtable_id
    ]
  );
  return rows[0];
};

// Получение заявки по ID
const getRequestById = async (id) => {
  const { rows } = await db.query('SELECT * FROM requests WHERE id = $1', [id]);
  return rows[0];
};

// Получение всех заявок
const getAllRequestsModel = async () => {
  const { rows } = await db.query('SELECT * FROM requests');
  return rows;
};

module.exports = {
  createRequest,
  getRequestById,
  getAllRequestsModel,
};

