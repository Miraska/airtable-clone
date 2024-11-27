const db = require("../config/dbConfig");

// Create a new request
const createRequest = async (data) => {
  const query = `
    INSERT INTO requests (
      autonumber, status, request_number, manager_id, reviewer, placement_date, hired, contractor_id,
      agent_id, client_id, client_inn, exporter_name, swift_code, country_id, payment_terms, 
      transaction_type, receipt_number, currency, request_amount, bank_commission, accred_commission,
      exchange_rate, hidden_rate, rate_fixation_date, request_by_rate, agent_fee, actual_fee, 
      total_amount, with_accreditor, primary_documents_received, invoice_issued, agent_signed,
      registered_in_bank, letter_of_credit_opened, currency_paid, letter_of_credit_released,
      report_signed, transaction_closed, payment_purpose, subagent_id, payer_id,
      sequential_number, agent_subagent_docs_prepared, swift_received, swift_status, request_link, 
      invoice_link, instruction_link, swift_link, report_link, airtable_id
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
      $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, 
      $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51
    ) RETURNING *
  `;

  const values = [
    data.autonumber, data.status, data.request_number, data.manager_id, data.reviewer,
    data.placement_date, data.hired, data.contractor_id, data.agent_id, data.client_id,
    data.client_inn, data.exporter_name, data.swift_code, data.country_id, data.payment_terms,
    data.transaction_type, data.receipt_number, data.currency, data.request_amount,
    data.bank_commission, data.accred_commission, data.exchange_rate, data.hidden_rate,
    data.rate_fixation_date, data.request_by_rate, data.agent_fee, data.actual_fee,
    data.total_amount, data.with_accreditor, data.primary_documents_received, data.invoice_issued,
    data.agent_signed, data.registered_in_bank, data.letter_of_credit_opened, data.currency_paid,
    data.letter_of_credit_released, data.report_signed, data.transaction_closed,
    data.payment_purpose, data.subagent_id, data.payer_id,
    data.sequential_number, data.agent_subagent_docs_prepared, data.swift_received, data.swift_status, 
    data.request_link, data.invoice_link, data.instruction_link, data.swift_link, data.report_link, data.airtable_id,
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};



// Get a request by ID including relational data
const getRequestById = async (id) => {
  const query = `
    SELECT r.*, m.name AS manager_name, c.name AS contractor_name, ag.name AS agent_name, 
           cl.name AS client_name, co.full_name AS country_name, sa.name AS subagent_name
    FROM requests r
    LEFT JOIN managers m ON r.manager_id = m.id
    LEFT JOIN contractors c ON r.contractor_id = c.id
    LEFT JOIN agents ag ON r.agent_id = ag.id
    LEFT JOIN clients cl ON r.client_id = cl.id
    LEFT JOIN countries co ON r.country_id = co.id
    LEFT JOIN subagents sa ON r.subagent_id = sa.id
    WHERE r.id = $1
  `;

  const { rows } = await db.query(query, [id]);
  return rows[0];
};

// Get all requests with relational data
const getAllRequestsModel = async () => {
  const query = `
    SELECT r.*, m.name AS manager_name, c.name AS contractor_name, ag.name AS agent_name, 
           cl.name AS client_name, co.full_name AS country_name, sa.name AS subagent_name
    FROM requests r
    LEFT JOIN managers m ON r.manager_id = m.id
    LEFT JOIN contractors c ON r.contractor_id = c.id
    LEFT JOIN agents ag ON r.agent_id = ag.id
    LEFT JOIN clients cl ON r.client_id = cl.id
    LEFT JOIN countries co ON r.country_id = co.id
    LEFT JOIN subagents sa ON r.subagent_id = sa.id
  `;

  const { rows } = await db.query(query);
  return rows;
};

// Update a request by ID
const updateRequestById = async (id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setString = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
  const query = `UPDATE requests SET ${setString} WHERE id = $${
    keys.length + 1
  } RETURNING *`;

  const { rows } = await db.query(query, [...values, id]);
  return rows[0];
};

// Delete a request by ID
const deleteRequestById = async (id) => {
  await db.query("DELETE FROM requests WHERE id = $1", [id]);
  return { message: "Request deleted successfully" };
};

module.exports = {
  createRequest,
  getRequestById,
  getAllRequestsModel,
  updateRequestById,
  deleteRequestById,
};
