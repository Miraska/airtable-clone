import Airtable from 'airtable';
import { TABLES, TABLE_NAMES } from '../config/tables';
import { COLUMN_NAMES } from './columnNames';

if (!import.meta.env.VITE_AIRTABLE_API_KEY) {
  throw new Error('Missing Airtable API key');
}

const airtable = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY
});

const base = airtable.base(import.meta.env.VITE_AIRTABLE_BASE_ID);

// Re-export configurations
export { TABLES, TABLE_NAMES, COLUMN_NAMES };

// Get all tables
export const getTables = async () => {
  return [
    { id: TABLES.APPLICATIONS, name: TABLE_NAMES[TABLES.APPLICATIONS] },
    { id: TABLES.MANAGERS, name: TABLE_NAMES[TABLES.MANAGERS] },
    { id: TABLES.CONTRACTORS, name: TABLE_NAMES[TABLES.CONTRACTORS] },
    { id: TABLES.AGENTS, name: TABLE_NAMES[TABLES.AGENTS] },
    { id: TABLES.CLIENTS, name: TABLE_NAMES[TABLES.CLIENTS] },
    { id: TABLES.COUNTRY, name: TABLE_NAMES[TABLES.COUNTRY] },
    { id: TABLES.SUBAGENTS, name: TABLE_NAMES[TABLES.SUBAGENTS] },
    { id: TABLES.SUBAGENT_PAYERS, name: TABLE_NAMES[TABLES.SUBAGENT_PAYERS] }
  ];
};

// Get table schema
export const getTableSchema = async (tableId: string) => {
  try {
    const fields = [];
    
    if (tableId === TABLES.MANAGERS) {
      fields.push(
        { name: 'Имя', type: 'text' },
        { name: 'Телефон', type: 'text' },
        { name: 'Дата рождения', type: 'date' },
        { name: 'Заявки', type: 'foreignKey', options: { foreignTableId: TABLES.APPLICATIONS } }
      );
    } else if (tableId === TABLES.CONTRACTORS) {
      fields.push(
        { name: 'Наименование', type: 'text' },
        { name: 'Заявки', type: 'foreignKey', options: { foreignTableId: TABLES.APPLICATIONS } }
      );
    } else if (tableId === TABLES.AGENTS) {
      fields.push(
        { name: 'Наименование', type: 'text' },
        { name: 'Заявки', type: 'foreignKey', options: { foreignTableId: TABLES.APPLICATIONS } }
      );
    } else if (tableId === TABLES.CLIENTS) {
      fields.push(
        { name: 'Наименование', type: 'text' },
        { name: 'ИНН', type: 'text' },
        { name: 'Заявки', type: 'foreignKey', options: { foreignTableId: TABLES.APPLICATIONS } }
      );
    } else if (tableId === TABLES.COUNTRY) {
      fields.push(
        { name: 'Краткое название', type: 'text' },
        { name: 'Код', type: 'number' },
        { name: 'Полное наименование', type: 'text' },
        { name: 'Заявки', type: 'foreignKey', options: { foreignTableId: TABLES.APPLICATIONS } }
      );
    } else if (tableId === TABLES.SUBAGENTS) {
      fields.push(
        { name: 'Наименование', type: 'text' },
        { name: 'Плательщик Субагента', type: 'foreignKey', options: { foreignTableId: TABLES.SUBAGENT_PAYERS } },
        { name: 'Заявки', type: 'foreignKey', options: { foreignTableId: TABLES.APPLICATIONS } }
      );
    } else if (tableId === TABLES.SUBAGENT_PAYERS) {
      fields.push(
        { name: 'Наименование', type: 'text' },
        { name: 'Заявки', type: 'foreignKey', options: { foreignTableId: TABLES.APPLICATIONS } }
      );
    } else if (tableId === TABLES.APPLICATIONS) {
      fields.push(
        { name: 'Статус', type: 'singleSelect' },
        { name: 'nomer zayavki', type: 'text' },
        { name: 'Менеджер', type: 'foreignKey', options: { foreignTableId: TABLES.MANAGERS } },
        { name: 'Проверяющий', type: 'foreignKey', options: { foreignTableId: TABLES.MANAGERS } },
        { name: 'Дата размещения', type: 'date' },
        { name: 'Взята в работу', type: 'date' },
        { name: 'Контрагент', type: 'foreignKey', options: { foreignTableId: TABLES.CONTRACTORS } },
        { name: 'Агент', type: 'foreignKey', options: { foreignTableId: TABLES.AGENTS } },
        { name: 'Клиент', type: 'foreignKey', options: { foreignTableId: TABLES.CLIENTS } },
        { name: 'ИНН (from Клиент)', type: 'lookup' },
        { name: 'Наименование Экспортера (при импорте) / Импортера (при экспорте)', type: 'text' },
        { name: 'SWIFT код банка получателя (при импорте) / отправителя (при экспорте)', type: 'text' },
        { name: 'Страна', type: 'foreignKey', options: { foreignTableId: TABLES.COUNTRY } },
        { name: 'Условия расчета', type: 'singleSelect' },
        { name: 'Номер поручения', type: 'text' },
        { name: 'Подписано поручение (для Совкомбанка)', type: 'date' },
        { name: 'Валюта', type: 'singleSelect' },
        { name: 'Заявка в валюте', type: 'number' },
        { name: 'Условия по VIP клиенту', type: 'text' },
        { name: 'Комиссия + %  банка', type: 'number' },
        { name: 'Комиссия + аккред', type: 'number' },
        { name: 'Комиссия+эскроу', type: 'number' },
        { name: 'Курс, руб', type: 'number' },
        { name: 'Дата фиксации курса', type: 'date' },
        { name: 'Сумма заявки в рублях', type: 'formula' },
        { name: 'С аккредитивом', type: 'checkbox' },
        { name: 'Вид сделки', type: 'singleSelect' },
        { name: 'Получили первичные документы', type: 'checkbox' },
        { name: 'выставлен инвойс на поставщика (импорт) / на отправителя (экспорт)', type: 'date' },
        { name: 'подписан агент. / субагент. договор', type: 'date' },
        { name: 'поставлен на учет в банке', type: 'date' },
        { name: 'Открыт аккредитив', type: 'date' },
        { name: 'оплачена валюта поставщику (импорт) / субагенту (экспорт)', type: 'date' },
        { name: 'получена валюта поставщиком (импорт) / субагентом (экспорт)', type: 'date' },
        { name: 'оплачен рубль клиенту (экспорт)', type: 'date' },
        { name: 'аккредитив раскрыт', type: 'date' },
        { name: 'подписан акт-отчет', type: 'date' },
        { name: 'сделка закрыта', type: 'date' },
        { name: 'Цикл сделки, дн', type: 'formula' },
        { name: 'Назначение платежа', type: 'text' },
        { name: 'Субагент', type: 'foreignKey', options: { foreignTableId: TABLES.SUBAGENTS } },
        { name: 'Плательщик Субагента 2', type: 'foreignKey', options: { foreignTableId: TABLES.SUBAGENT_PAYERS } },
        { name: 'Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)', type: 'number' },
        { name: 'Подготовлены документы между агентом и субагентом (дата)', type: 'date' },
        { name: 'Получен SWIFT', type: 'date' },
        { name: 'Запросили SWIFT 103', type: 'date' },
        { name: 'Запросили SWIFT 199', type: 'date' },
        { name: 'Статус SWIFT', type: 'singleSelect' },
        { name: 'Зависли деньги', type: 'checkbox' },
        { name: 'комментарии к заявкам по которым зависли деньги', type: 'text' },
        { name: 'Поступило на наш расчетный счет', type: 'number' },
        { name: 'Agentskoe voznagrazhdenie', type: 'text' },
        { name: 'Ostatok k oplate', type: 'singleSelect' },
        { name: 'Bank', type: 'singleSelect' },
        { name: 'Kommentarii po zayavke', type: 'text' },
        { name: 'Oshibki po zayavke', type: 'text' },
        { name: 'Postupilo na nash raschetnyj schet data', type: 'date' },
        { name: 'Agentskoe voznagrazhdenie date', type: 'date' },
        { name: 'Плательщик субагента', type: 'text' },
        { name: 'В разработке', type: 'number' }
      );
    }

    return fields;
  } catch (error: any) {
    console.error('Error fetching table schema:', error);
    throw new Error('Failed to fetch table schema');
  }
};

// Get table data
export const getTableData = async (tableId: string) => {
  try {
    const table = base(tableId);
    const records = await table.select().all();
    return records.map(record => ({
      id: record.id,
      ...record.fields
    }));
  } catch (error: any) {
    console.error('Error fetching table data:', error);
    throw new Error('Failed to fetch table data');
  }
};

// Get single record
export const getRecord = async (tableId: string, recordId: string) => {
  try {
    const table = base(tableId);
    const record = await table.find(recordId);
    return {
      id: record.id,
      ...record.fields
    };
  } catch (error: any) {
    console.error('Error fetching record:', error);
    throw new Error('Failed to fetch record');
  }
};

// Get linked records
export const getLinkedRecords = async (tableId: string, recordIds: string[]) => {
  try {
    const table = base(tableId);
    const records = await Promise.all(recordIds.map(id => table.find(id)));
    return records.map(record => ({
      id: record.id,
      fields: record.fields
    }));
  } catch (error: any) {
    console.error('Error fetching linked records:', error);
    throw new Error('Failed to fetch linked records');
  }
};

// Create record
export const createRecord = async (tableId: string, data: any) => {
  try {
    const table = base(tableId);
    const record = await table.create(data);
    return {
      id: record.id,
      ...record.fields
    };
  } catch (error: any) {
    console.error('Error creating record:', error);
    throw error;
  }
};

// Update record
export const updateRecord = async (tableId: string, recordId: string, data: any) => {
  try {
    const table = base(tableId);
    const record = await table.update(recordId, data);
    return {
      id: record.id,
      ...record.fields
    };
  } catch (error: any) {
    console.error('Error updating record:', error);
    throw error;
  }
};

// Delete record
export const deleteRecord = async (tableId: string, recordId: string) => {
  try {
    const table = base(tableId);
    await table.destroy(recordId);
  } catch (error: any) {
    console.error('Error deleting record:', error);
    throw error;
  }
};