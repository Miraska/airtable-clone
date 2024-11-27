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

// Универсальная функция синхронизации таблицы
const syncTable = async (airtableTableName, dbTableName, fieldsMapping) => {
  try {
    console.log(`Syncing ${dbTableName} table...`);
    const records = await base(airtableTableName).select().all();

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

// Синхронизация таблицы менеджеров
const syncManagers = async () => {
  await syncTable('tblvc0HkBpEMiMVWg', 'managers', {
    name: 'Имя',
    phone: 'Телефон',
    birthday: 'Дата рождения',
  });
};

// Синхронизация таблицы контрагентов
const syncContractors = async () => {
  await syncTable('tblDdr1QIQguuKpBI', 'contractors', {
    name: 'Наименование',
  });
};

// Синхронизация таблицы агентов
const syncAgents = async () => {
  await syncTable('tblL7awd42tZovKJu', 'agents', {
    name: 'Наименование',
  });
};

// Синхронизация таблицы клиентов
const syncClients = async () => {
  await syncTable('tblDbjr1Xl8kSpgg3', 'clients', {
    name: 'Наименование',
    inn: 'ИНН',
  });
};

// Синхронизация таблицы стран
const syncCountries = async () => {
  await syncTable('tblHfN4CTmLvxXYz0', 'countries', {
    short_name: 'Краткое название',
    code: 'Код',
    full_name: 'Полное наименование',
  });
};

// Синхронизация таблицы субагентов
const syncSubagents = async () => {
  await syncTable('tblLiWlluRJ9M8aNr', 'subagents', {
    name: 'Наименование',
    payer: 'Плательщик Субагента',
  });
};

// Синхронизация таблицы заявок
const syncRequests = async () => {
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

      const managerId = fields['Менеджер']
        ? await getOrCreateRecord('managers', fields['Менеджер'][0], {
            name: fields['Менеджер (имя)'],
            phone: fields['Телефон'],
            birthday: parseValidDate(fields['Дата рождения']),
          })
        : null;

      const contractorId = fields['Контрагент']
        ? await getOrCreateRecord('contractors', fields['Контрагент'][0], {
            name: fields['Контрагент (имя)'],
          })
        : null;

      const agentId = fields['Агент']
        ? await getOrCreateRecord('agents', fields['Агент'][0], {
            name: fields['Агент (имя)'],
          })
        : null;

      const clientId = fields['Клиент']
        ? await getOrCreateRecord('clients', fields['Клиент'][0], {
            name: fields['Клиент (имя)'],
            inn: fields['ИНН'] ? fields['ИНН'].substring(0, 20) : null,
          })
        : null;

      const countryId = fields['Страна']
        ? await getOrCreateRecord('countries', fields['Страна'][0], {
            short_name: fields['Краткое название'],
            code: fields['Код'],
            full_name: fields['Полное наименование'],
          })
        : null;

      const subagentId = fields['Субагент']
        ? await getOrCreateRecord('subagents', fields['Субагент'][0], {
            name: fields['Субагент (имя)'],
            payer: fields['Плательщик Субагента'],
          })
        : null;

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
        airtable_id: airtableId,
      };

      const result = await db.query('SELECT * FROM requests WHERE airtable_id = $1', [airtableId]);
      if (result.rows.length > 0) {
        const updateQuery = `
          UPDATE requests SET ${Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(', ')}
          WHERE airtable_id = $${Object.keys(data).length + 1} RETURNING *;
        `;
        await db.query(updateQuery, [...Object.values(data), airtableId]);
      } else {
        const insertQuery = `
          INSERT INTO requests (${Object.keys(data).join(', ')})
          VALUES (${Object.keys(data).map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *;
        `;
        await db.query(insertQuery, Object.values(data));
      }
    }

    console.log('Finished syncing Requests table.');
  } catch (error) {
    console.error('Error syncing Requests table:', error);
  }
};

// Основная функция синхронизации
const syncAll = async () => {
  console.log('Starting full sync...');
  await syncManagers();
  await syncContractors();
  await syncAgents();
  await syncClients();
  await syncCountries();
  await syncSubagents();
  await syncRequests();
  console.log('Full sync completed.');
};

// Экспорт функций
module.exports = {
  syncManagers,
  syncContractors,
  syncAgents,
  syncClients,
  syncCountries,
  syncSubagents,
  syncRequests,
  syncAll,
};
