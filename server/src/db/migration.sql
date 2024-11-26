CREATE TABLE managers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    birthday DATE,
    airtable_id VARCHAR(255) UNIQUE
);

CREATE TABLE contractors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    airtable_id VARCHAR(255) UNIQUE
);

CREATE TABLE agents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    airtable_id VARCHAR(255) UNIQUE
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    inn VARCHAR(20),
    airtable_id VARCHAR(255) UNIQUE
);

CREATE TABLE subagents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    payer VARCHAR(255),
    airtable_id VARCHAR(255) UNIQUE
);

CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    short_name VARCHAR(255),
    code VARCHAR(10),
    full_name VARCHAR(255),
    airtable_id VARCHAR(255) UNIQUE
);

CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    autonumber VARCHAR(255),
    status VARCHAR(255),
    request_number VARCHAR(255),
    reviewer VARCHAR(255),
    placement_date DATE,
    hired DATE,
    client_inn VARCHAR(255),
    exporter_name VARCHAR(255),
    swift_code VARCHAR(255),
    payment_terms VARCHAR(255),
    transaction_type VARCHAR(255),
    receipt_number VARCHAR(255),
    currency VARCHAR(255),
    request_amount NUMERIC,
    bank_commission NUMERIC,
    accred_commission NUMERIC,
    exchange_rate NUMERIC,
    hidden_rate NUMERIC,
    rate_fixation_date DATE,
    request_by_rate NUMERIC,
    agent_fee NUMERIC,
    actual_fee NUMERIC,
    total_amount NUMERIC,
    with_accreditor NUMERIC,
    primary_documents_received BOOLEAN,
    invoice_issued BOOLEAN,
    agent_signed DATE,
    registered_in_bank DATE,
    letter_of_credit_opened DATE,
    currency_paid DATE,
    letter_of_credit_released DATE,
    report_signed DATE,
    transaction_closed DATE,
    payment_purpose VARCHAR(255),
    subagent_payer VARCHAR(255),
    sequential_number VARCHAR(255),
    agent_subagent_docs_prepared DATE,
    swift_received BOOLEAN,
    swift_status VARCHAR(255),
    request_link VARCHAR(255),
    invoice_link VARCHAR(255),
    instruction_link VARCHAR(255),
    swift_link VARCHAR(255),
    report_link VARCHAR(255),
    airtable_id VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE managers_requests (
    manager_id INTEGER REFERENCES managers(id),
    request_id INTEGER REFERENCES requests(id),
    PRIMARY KEY (manager_id, request_id)
);

CREATE TABLE contractors_requests (
    contractor_id INTEGER REFERENCES contractors(id),
    request_id INTEGER REFERENCES requests(id),
    PRIMARY KEY (contractor_id, request_id)
);

CREATE TABLE agents_requests (
    agent_id INTEGER REFERENCES agents(id),
    request_id INTEGER REFERENCES requests(id),
    PRIMARY KEY (agent_id, request_id)
);

CREATE TABLE clients_requests (
    client_id INTEGER REFERENCES clients(id),
    request_id INTEGER REFERENCES requests(id),
    PRIMARY KEY (client_id, request_id)
);

CREATE TABLE subagents_requests (
    subagent_id INTEGER REFERENCES subagents(id),
    request_id INTEGER REFERENCES requests(id),
    PRIMARY KEY (subagent_id, request_id)
);

CREATE TABLE countries_requests (
    country_id INTEGER REFERENCES countries(id),
    request_id INTEGER REFERENCES requests(id),
    PRIMARY KEY (country_id, request_id)
);