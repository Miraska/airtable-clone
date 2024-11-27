-- Таблица менеджеров
CREATE TABLE managers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    birthday DATE,
    airtable_id VARCHAR(255) UNIQUE
);

-- Таблица контрагентов
CREATE TABLE contractors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    airtable_id VARCHAR(255) UNIQUE
);

-- Таблица агентов
CREATE TABLE agents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    airtable_id VARCHAR(255) UNIQUE
);

-- Таблица клиентов
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    inn VARCHAR(20),
    airtable_id VARCHAR(255) UNIQUE
);

-- Таблица плательщиков субагентов
CREATE TABLE subagent_payers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    airtable_id VARCHAR(255) UNIQUE
);

-- Таблица субагентов
CREATE TABLE subagents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    payer_id INTEGER REFERENCES subagent_payers(id),
    airtable_id VARCHAR(255) UNIQUE
);

-- Таблица стран
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    short_name VARCHAR(255),
    code VARCHAR(10),
    full_name VARCHAR(255),
    airtable_id VARCHAR(255) UNIQUE
);

-- Таблица заявок
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
    with_accreditor BOOLEAN,
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
    airtable_id VARCHAR(255) NOT NULL UNIQUE,
    manager_id INTEGER REFERENCES managers(id),
    contractor_id INTEGER REFERENCES contractors(id),
    agent_id INTEGER REFERENCES agents(id),
    client_id INTEGER REFERENCES clients(id),
    country_id INTEGER REFERENCES countries(id),
    subagent_id INTEGER REFERENCES subagents(id),
    payer_id INTEGER REFERENCES subagent_payers(id)  -- Note: There is a `payer_id`, but no `subagent_payer_id`
);


-- Связи многие ко многим: менеджеры и заявки
CREATE TABLE managers_requests (
    manager_id INTEGER REFERENCES managers(id),
    request_id INTEGER REFERENCES requests(id),
    PRIMARY KEY (manager_id, request_id)
);

-- Связи многие ко многим: контрагенты и заявки
CREATE TABLE contractors_requests (
    contractor_id INTEGER REFERENCES contractors(id),
    request_id INTEGER REFERENCES requests(id),
    PRIMARY KEY (contractor_id, request_id)
);

-- Связи многие ко многим: агенты и заявки
CREATE TABLE agents_requests (
    agent_id INTEGER REFERENCES agents(id),
    request_id INTEGER REFERENCES requests(id),
    PRIMARY KEY (agent_id, request_id)
);

-- Связи многие ко многим: клиенты и заявки
CREATE TABLE clients_requests (
    client_id INTEGER REFERENCES clients(id),
    request_id INTEGER REFERENCES requests(id),
    PRIMARY KEY (client_id, request_id)
);

-- Связи многие ко многим: плательщики субагентов и заявки
CREATE TABLE subagent_payers_requests (
    payer_id INTEGER REFERENCES subagent_payers(id),
    request_id INTEGER REFERENCES requests(id),
    PRIMARY KEY (payer_id, request_id)
);

-- Связи многие ко многим: субагенты и заявки
CREATE TABLE subagents_requests (
    subagent_id INTEGER REFERENCES subagents(id),
    request_id INTEGER REFERENCES requests(id),
    PRIMARY KEY (subagent_id, request_id)
);

-- Связи многие ко многим: страны и заявки
CREATE TABLE countries_requests (
    country_id INTEGER REFERENCES countries(id),
    request_id INTEGER REFERENCES requests(id),
    PRIMARY KEY (country_id, request_id)
);



-- УДАЛЕНИЕ ТАБЛИЦ в схеме public ==================
DO $$
DECLARE
    r RECORD;
BEGIN
    -- Перебираем все таблицы в схеме public
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        -- Удаляем таблицу, если она существует
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
        RAISE NOTICE 'Таблица % успешно удалена.', r.tablename;
    END LOOP;
END $$;



-- ЗАПРОСЫ К РАЗНЫМ ТАБЛИЦАМ =========================
SELECT * FROM agents;
SELECT * FROM clients;
SELECT * FROM contractors;
SELECT * FROM countries;
SELECT * FROM managers;
SELECT * FROM requests;
SELECT * FROM subagents;
SELECT * FROM subagent_payers;


-- ВЫВОД ВСЕХ ДАННЫХ В ТАБЛИЦАХ И ИХ СВЯЗЕЙ ===========================
SELECT 
    r.*, 
    m.name AS manager_name,
    c.name AS contractor_name, 
    ag.name AS agent_name,
    cl.name AS client_name,
    co.full_name AS country_name,
    sa.name AS subagent_name,
    sp.name AS subagent_payer_name
FROM requests r
LEFT JOIN managers m ON r.manager_id = m.id
LEFT JOIN contractors c ON r.contractor_id = c.id
LEFT JOIN agents ag ON r.agent_id = ag.id
LEFT JOIN clients cl ON r.client_id = cl.id
LEFT JOIN countries co ON r.country_id = co.id
LEFT JOIN subagents sa ON r.subagent_id = sa.id
LEFT JOIN subagent_payers sp ON r.payer_id = sp.id;



-- СОЗДАНИЕ 2 ЗАПИСЕЙ В БД ===========================
-- SQL запросы для заполнения базы данных исходя из предоставленного JSON файла

-- Вставка данных в таблицу менеджеров
INSERT INTO managers (name, phone, birthday, airtable_id)
VALUES 
  ('Иван Иванов', '+79001234567', '1980-05-15', 'mgr_001'),
  ('Ольга Петрова', '+79007654321', '1985-11-22', 'mgr_002')
ON CONFLICT (airtable_id) DO NOTHING;

-- Вставка данных в таблицу контрагентов
INSERT INTO contractors (name, airtable_id)
VALUES 
  ('Контрагент А', 'ctr_001'),
  ('Контрагент Б', 'ctr_002')
ON CONFLICT (airtable_id) DO NOTHING;

-- Вставка данных в таблицу агентов
INSERT INTO agents (name, airtable_id)
VALUES 
  ('Агент А', 'agt_001'),
  ('Агент Б', 'agt_002')
ON CONFLICT (airtable_id) DO NOTHING;

-- Вставка данных в таблицу клиентов
INSERT INTO clients (name, inn, airtable_id)
VALUES 
  ('Клиент А', '1234567890', 'cl_001'),
  ('Клиент Б', '0987654321', 'cl_002')
ON CONFLICT (airtable_id) DO NOTHING;

-- Вставка данных в таблицу плательщиков субагентов
INSERT INTO subagent_payers (name, airtable_id)
VALUES 
  ('Плательщик Субагента А', 'sap_001'),
  ('Плательщик Субагента Б', 'sap_002')
ON CONFLICT (airtable_id) DO NOTHING;

-- Вставка данных в таблицу субагентов
INSERT INTO subagents (name, payer_id, airtable_id)
VALUES 
  ('Субагент А', 1, 'sub_001'),
  ('Субагент Б', 2, 'sub_002')
ON CONFLICT (airtable_id) DO NOTHING;

-- Вставка данных в таблицу стран
INSERT INTO countries (short_name, code, full_name, airtable_id)
VALUES 
  ('Россия', 'RU', 'Российская Федерация', 'cty_001'),
  ('Казахстан', 'KZ', 'Республика Казахстан', 'cty_002')
ON CONFLICT (airtable_id) DO NOTHING;

-- Вставка данных в таблицу заявок
INSERT INTO requests (
  autonumber, status, request_number, reviewer, placement_date, hired, client_inn, exporter_name, swift_code,
  payment_terms, transaction_type, receipt_number, currency, request_amount, bank_commission, accred_commission,
  exchange_rate, hidden_rate, rate_fixation_date, request_by_rate, agent_fee, actual_fee, total_amount,
  with_accreditor, primary_documents_received, invoice_issued, agent_signed, registered_in_bank,
  letter_of_credit_opened, currency_paid, letter_of_credit_released, report_signed, transaction_closed,
  payment_purpose, subagent_payer, sequential_number, agent_subagent_docs_prepared, swift_received, swift_status,
  request_link, invoice_link, instruction_link, swift_link, report_link, airtable_id, manager_id, contractor_id,
  agent_id, client_id, country_id, subagent_id, payer_id
)
VALUES 
  ('REQ-001', 'Открыта', '2023-01', 'Иван Иванов', '2023-02-10', '2023-02-15', '1234567890', 'Экспортер А', 'SWFT1234',
   '30 дней', 'Импорт', 'RCP-001', 'RUB', 1000000, 5000, 2000, 75.5, 1.2, '2023-02-11', 760000, 15000, 14000, 1025000,
   TRUE, TRUE, FALSE, '2023-02-20', '2023-02-21', '2023-02-25', '2023-02-28', '2023-03-01', '2023-03-05', '2023-03-10',
   'Оплата товаров', 'Плательщик Субагента А', '12345', '2023-02-22', TRUE, 'Успешно', 'http://example.com/req_001',
   'http://example.com/invoice_001', 'http://example.com/instr_001', 'http://example.com/swift_001',
   'http://example.com/report_001', 'req_001', 1, 1, 1, 1, 1, 1, 1),
  ('REQ-002', 'Закрыта', '2023-02', 'Ольга Петрова', '2023-03-01', '2023-03-05', '0987654321', 'Экспортер Б', 'SWFT5678',
   '60 дней', 'Экспорт', 'RCP-002', 'USD', 2000000, 7000, 3000, 76.0, 1.5, '2023-03-02', 1520000, 20000, 19000, 2049000,
   FALSE, TRUE, TRUE, '2023-03-10', '2023-03-15', '2023-03-20', '2023-03-25', '2023-04-01', '2023-04-05', '2023-04-10',
   'Оплата услуг', 'Плательщик Субагента Б', '54321', '2023-03-12', TRUE, 'Завершено', 'http://example.com/req_002',
   'http://example.com/invoice_002', 'http://example.com/instr_002', 'http://example.com/swift_002',
   'http://example.com/report_002', 'req_002', 2, 2, 2, 2, 2, 2, 2)
ON CONFLICT (airtable_id) DO NOTHING;