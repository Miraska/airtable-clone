CREATE TABLE IF NOT EXISTS "Agents" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Clients" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    inn VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS "Orders" (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    order_number INT UNIQUE NOT NULL,
    client_inn VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS "Managers" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Contractors" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Subagents" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subagent_payer_id INT REFERENCES "SubagentPayers"(id)
);

CREATE TABLE IF NOT EXISTS "SubagentPayers" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "OrderAgents" (
    order_id INT REFERENCES "Orders"(id),
    agent_id INT REFERENCES "Agents"(id),
    PRIMARY KEY (order_id, agent_id)
);

CREATE TABLE IF NOT EXISTS "OrderClients" (
    order_id INT REFERENCES "Orders"(id),
    client_id INT REFERENCES "Clients"(id),
    PRIMARY KEY (order_id, client_id)
);

CREATE TABLE IF NOT EXISTS "OrderContractors" (
    order_id INT REFERENCES "Orders"(id),
    contractor_id INT REFERENCES "Contractors"(id),
    PRIMARY KEY (order_id, contractor_id)
);

CREATE TABLE IF NOT EXISTS "OrderSubagents" (
    order_id INT REFERENCES "Orders"(id),
    subagent_id INT REFERENCES "Subagents"(id),
    PRIMARY KEY (order_id, subagent_id)
);
