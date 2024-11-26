const Airtable = require('airtable');
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = require('../config/airtableConfig');
const db = require('../config/dbConfig');

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// Универсальная функция для получения или создания записи в таблице
const getOrCreateRecord = async (dbTableName, airtableId, data) => {
  try {
    const result = await db.query(`SELECT * FROM ${dbTableName} WHERE airtable_id = $1`, [airtableId]);
    if (result.rows.length > 0) {
      return result.rows[0].id;
    } else {
      const columns = Object.keys(data).filter(key => data[key] !== null && data[key] !== undefined);
      const values = columns.map(key => data[key]);
      if (columns.length === 0) {
        throw new Error(`No valid data provided for table ${dbTableName}`);
      }
      columns.push('airtable_id');
      values.push(airtableId);
      const valuePlaceholders = columns.map((_, i) => `$${i + 1}`).join(', ');
      const insertQuery = `INSERT INTO ${dbTableName} (${columns.join(', ')}) VALUES (${valuePlaceholders}) RETURNING *`;
      const insertResult = await db.query(insertQuery, values);
      return insertResult.rows[0].id;
    }
  } catch (error) {
    console.error(`Error in getOrCreateRecord for ${dbTableName}:`, error);
    throw error;
  }
};

// Функция синхронизации таблицы users
const syncUsersTable = async (tableName, dbTableName, fieldsMapping) => {
  try {
    console.log(`Syncing ${dbTableName} table...`);
    const records = await base(tableName).select().all();

    for (let record of records) {
      const airtableId = record.id;
      const data = {};

      for (const [dbField, airtableField] of Object.entries(fieldsMapping)) {
        data[dbField] = record.fields[airtableField] || null;
      }

      const hasValidData = Object.values(data).some(value => value !== null && value !== undefined);
      if (!hasValidData) {
        continue;
      }

      await getOrCreateRecord(dbTableName, airtableId, data);
    }

    console.log(`Finished syncing ${dbTableName} table.`);
  } catch (error) {
    console.error(`Error syncing ${dbTableName} table:`, error);
  }
};

// Функция синхронизации таблицы requests
const syncRequestsTable = async () => {
  try {
    console.log('Syncing Requests table...');
    const records = await base('tblYzFLRCr4G1Apae').select().all();

    const parseValidDate = (date) => {
      if (date && typeof date === 'string' && !isNaN(Date.parse(date))) {
        return new Date(date);
      }
      return null;
    };

    for (let record of records) {
      const fields = record.fields;
      const airtableId = record.id;

      const managerId = fields['Менеджер'] ? await getOrCreateRecord('managers', fields['Менеджер'][0], { name: fields['Менеджер (имя)'], phone: fields['Телефон'], birthday: parseValidDate(fields['Дата рождения']) }) : null;
      const contractorId = fields['Контрагент'] ? await getOrCreateRecord('contractors', fields['Контрагент'][0], { name: fields['Контрагент (имя)'] }) : null;
      const agentId = fields['Агент'] ? await getOrCreateRecord('agents', fields['Агент'][0], { name: fields['Агент (имя)'] }) : null;
      const clientId = fields['Клиент'] ? await getOrCreateRecord('clients', fields['Клиент'][0], { name: fields['Клиент (имя)'], inn: fields['ИНН'] ? fields['ИНН'].substring(0, 20) : null }) : null;
      const countryId = fields['Страна'] ? await getOrCreateRecord('countries', fields['Страна'][0], { short_name: fields['Краткое название'], code: fields['Код'], full_name: fields['Полное наименование'] }) : null;
      const subagentId = fields['Субагент'] ? await getOrCreateRecord('subagents', fields['Субагент'][0], { name: fields['Субагент (имя)'], payer: fields['Плательщик Субагента'] }) : null;

      const data = {
        autonumber: fields['Автономер'] || 'Неизвестный',
        status: fields['Статус'] || 'Не указан',
        request_number: fields['№ заявки'] || 'Не указан',
        reviewer: fields['Проверяющий'] || 'Не указан',
        placement_date: parseValidDate(fields['Дата размещения']),
        hired: parseValidDate(fields['Взят на работу']),
        client_inn: fields['ИНН от клиента'] || 'Не указан',
        exporter_name: fields['Наименование экспортера при мипорте или экспорте'] || 'Не указано',
        swift_code: fields['SWIFT код банка получателя'] || 'Не указан',
        payment_terms: fields['Условия расчета'] || 'Не указаны',
        transaction_type: fields['Вид сделки'] || 'Не указан',
        receipt_number: fields['Номер получения'] || 'Не указан',
        currency: fields['Валюта'] || 'Не указана',
        request_amount: fields['Сумма заявки'] || 0,
        bank_commission: fields['Комиссия + процент банка'] || 0,
        accred_commission: fields['Комиссия + аккред'] || 0,
        exchange_rate: fields['Курс'] || 0,
        hidden_rate: fields['Скрытый курс'] || 0,
        rate_fixation_date: parseValidDate(fields['Дата фиксации курса']),
        request_by_rate: fields['Заявка по курсу'] || 0,
        agent_fee: fields['Агентское вознаграждение'] || 0,
        actual_fee: fields['Фактическое вознаграждение'] || 0,
        total_amount: fields['Итого'] || 0,
        with_accreditor: fields['С акреддитором'] || 0,
        primary_documents_received: typeof fields['Получили первичные документы'] === 'boolean' ? fields['Получили первичные документы'] : false,
        invoice_issued: typeof fields['Выставлен иновйс на поставщика'] === 'boolean' ? fields['Выставлен иновйс на поставщика'] : false,
        agent_signed: parseValidDate(fields['Подписан агент (дата)']),
        registered_in_bank: parseValidDate(fields['Поставлен на учет в банке (дата)']),
        letter_of_credit_opened: parseValidDate(fields['Открыт аккредитив (дата)']),
        currency_paid: parseValidDate(fields['Оплачена валюта поставщику (дата)']),
        letter_of_credit_released: parseValidDate(fields['Аккредитив раскрыт (дата)']),
        report_signed: parseValidDate(fields['Подписан акт-отчет (дата)']),
        transaction_closed: parseValidDate(fields['Сделка закрыта (дата)']),
        payment_purpose: fields['Назначение платежа'] || 'Не указано',
        subagent_payer: fields['Плательщик субагента'] || 'Не указан',
        sequential_number: fields['Порядковый номер'] || 'Не указан',
        agent_subagent_docs_prepared: parseValidDate(fields['Подготовлены документы между агентом и субагентом (дата)']),
        swift_received: typeof fields['Получен SWIFT'] === 'boolean' ? fields['Получен SWIFT'] : false,
        swift_status: fields['Статус SWIFT'] || 'Не указан',
        request_link: fields['Заявка ссылка'] || 'Не указано',
        invoice_link: fields['Инвойс ссылка'] || 'Не указано',
        instruction_link: fields['Поручение ссылка'] || 'Не указано',
        swift_link: fields['SWIFT ссылка'] || 'Не указано',
        report_link: fields['Акт-отчет ссылка'] || 'Не указано',
        airtable_id: airtableId,
      };

      const result = await db.query('SELECT * FROM requests WHERE airtable_id = $1', [airtableId]);

      let requestId;
      if (result.rows.length > 0) {
        const updateQuery = `
          UPDATE requests
          SET ${Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(', ')}
          WHERE airtable_id = $${Object.keys(data).length + 1}
          RETURNING *;
        `;
        const updateResult = await db.query(updateQuery, [...Object.values(data), airtableId]);
        requestId = updateResult.rows[0].id;
      } else {
        const insertQuery = `
          INSERT INTO requests (${Object.keys(data).join(', ')})
          VALUES (${Object.keys(data).map((_, i) => `$${i + 1}`).join(', ')})
          RETURNING *;
        `;
        const insertResult = await db.query(insertQuery, Object.values(data));
        requestId = insertResult.rows[0].id;
      }

      if (managerId) {
        const managerRequestQuery = `
          INSERT INTO managers_requests (manager_id, request_id)
          VALUES ($1, $2)
          ON CONFLICT (manager_id, request_id) DO NOTHING;
        `;
        await db.query(managerRequestQuery, [managerId, requestId]);
      }

      if (contractorId) {
        const contractorRequestQuery = `
          INSERT INTO contractors_requests (contractor_id, request_id)
          VALUES ($1, $2)
          ON CONFLICT (contractor_id, request_id) DO NOTHING;
        `;
        await db.query(contractorRequestQuery, [contractorId, requestId]);
      }

      if (agentId) {
        const agentRequestQuery = `
          INSERT INTO agents_requests (agent_id, request_id)
          VALUES ($1, $2)
          ON CONFLICT (agent_id, request_id) DO NOTHING;
        `;
        await db.query(agentRequestQuery, [agentId, requestId]);
      }

      if (clientId) {
        const clientRequestQuery = `
          INSERT INTO clients_requests (client_id, request_id)
          VALUES ($1, $2)
          ON CONFLICT (client_id, request_id) DO NOTHING;
        `;
        await db.query(clientRequestQuery, [clientId, requestId]);
      }

      if (subagentId) {
        const subagentRequestQuery = `
          INSERT INTO subagents_requests (subagent_id, request_id)
          VALUES ($1, $2)
          ON CONFLICT (subagent_id, request_id) DO NOTHING;
        `;
        await db.query(subagentRequestQuery, [subagentId, requestId]);
      }

      if (countryId) {
        const countryRequestQuery = `
          INSERT INTO countries_requests (country_id, request_id)
          VALUES ($1, $2)
          ON CONFLICT (country_id, request_id) DO NOTHING;
        `;
        await db.query(countryRequestQuery, [countryId, requestId]);
      }
    }

    console.log('Finished syncing Requests table.');
  } catch (error) {
    console.error('Error syncing Requests table:', error);
  }
};

// Основная функция синхронизации
const syncAirtableToDB = async () => {
  try {
    console.log('Starting Airtable to DB sync...');

    await syncUsersTable('tblvc0HkBpEMiMVWg', 'managers', { name: 'Имя', phone: 'Телефон', birthday: 'Дата рождения' });
    await syncUsersTable('tblDdr1QIQguuKpBI', 'contractors', { name: 'Наименование' });
    await syncUsersTable('tblL7awd42tZovKJu', 'agents', { name: 'Наименование' });
    await syncUsersTable('tblDbjr1Xl8kSpgg3', 'clients', { name: 'Наименование', inn: 'ИНН' });
    await syncUsersTable('tblHfN4CTmLvxXYz0', 'countries', { short_name: 'Краткое название', code: 'Код', full_name: 'Полное наименование' });
    await syncUsersTable('tblLiWlluRJ9M8aNr', 'subagents', { name: 'Наименование', payer: 'Плательщик Субагента' });
    await syncRequestsTable();

    console.log('Finished syncing Airtable to DB.');
  } catch (error) {
    console.error('Error syncing Airtable to DB:', error);
  }
};

module.exports = { syncAirtableToDB };
