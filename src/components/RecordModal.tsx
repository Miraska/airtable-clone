import React from 'react';
import { X, Edit } from 'lucide-react';
import { useQuery } from 'react-query';
import { getRecord, getTableSchema, TABLES } from '../lib/airtable';
import { LinkedRecord } from '../types/airtable';
import { LinkedRecordButton } from './LinkedRecordButton';
import { ApplicationForm } from './ApplicationForm';
import { APPLICATION_FIELD_ORDER } from '../lib/fieldOrder';
import {
  ManagerForm,
  ContractorForm,
  AgentForm,
  ClientForm,
  CountryForm,
  SubagentForm,
  SubagentPayerForm
} from './ReferenceForm';

interface RecordModalProps {
  tableId: string;
  recordId: string;
  onClose: () => void;
  onLinkedRecordClick: (record: LinkedRecord) => void;
}

export function RecordModal({ tableId, recordId, onClose, onLinkedRecordClick }: RecordModalProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  
  const { data: record, isLoading: recordLoading } = useQuery(
    ['record', tableId, recordId],
    () => getRecord(tableId, recordId),
    { retry: 1 }
  );

  const { data: schema = [], isLoading: schemaLoading } = useQuery(
    ['schema', tableId],
    () => getTableSchema(tableId),
    { retry: 1 }
  );

  const isLoading = recordLoading || schemaLoading;

  const handleEditSuccess = () => {
    setIsEditing(false);
  };

  const renderValue = (key: string, value: any) => {
    if (!value) return null;

    const field = schema.find(f => f.name === key);
    
    if (field?.type === 'foreignKey') {
      const linkedRecords = Array.isArray(value) ? value : [value];
      return (
        <LinkedRecordButton
          records={linkedRecords.map(id => ({
            id,
            table: field.options?.foreignTableId || tableId,
            value: String(value)
          }))}
          onClick={(e, linkedRecord) => {
            e.stopPropagation();
            onLinkedRecordClick(linkedRecord);
          }}
        />
      );
    }

    if (Array.isArray(value)) {
      return value.join(', ');
    }

    if (typeof value === 'boolean') {
      return value ? '✓' : '✗';
    }

    return String(value);
  };

  const renderForm = () => {
    const formProps = {
      initialData: record,
      onSubmit: handleEditSuccess,
      onCancel: () => setIsEditing(false)
    };

    switch (tableId) {
      case TABLES.MANAGERS:
        return <ManagerForm {...formProps} />;
      case TABLES.CONTRACTORS:
        return <ContractorForm {...formProps} />;
      case TABLES.AGENTS:
        return <AgentForm {...formProps} />;
      case TABLES.CLIENTS:
        return <ClientForm {...formProps} />;
      case TABLES.COUNTRY:
        return <CountryForm {...formProps} />;
      case TABLES.SUBAGENTS:
        return <SubagentForm {...formProps} />;
      case TABLES.SUBAGENT_PAYERS:
        return <SubagentPayerForm {...formProps} />;
      case TABLES.APPLICATIONS:
        return <ApplicationForm {...formProps} />;
      default:
        return null;
    }
  };

  const getOrderedFields = () => {
    if (tableId === TABLES.APPLICATIONS) {
      return APPLICATION_FIELD_ORDER;
    }

    switch (tableId) {
      case TABLES.MANAGERS:
        return ['Имя', 'Телефон', 'Дата рождения'];
      case TABLES.CONTRACTORS:
        return ['Наименование'];
      case TABLES.AGENTS:
        return ['Наименование'];
      case TABLES.CLIENTS:
        return ['Наименование', 'ИНН'];
      case TABLES.COUNTRY:
        return ['Краткое название', 'Код', 'Полное наименование'];
      case TABLES.SUBAGENTS:
        return ['Наименование', 'Плательщик Субагента'];
      case TABLES.SUBAGENT_PAYERS:
        return ['Наименование'];
      default:
        return Object.keys(record || {}).filter(key => key !== 'id');
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white dark:bg-dark-900 p-8 rounded-lg">
          Загрузка...
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-dark-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          <div className="flex justify-between items-center p-6 border-b dark:border-dark-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Редактирование записи
            </h2>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {renderForm()}
          </div>
        </div>
      </div>
    );
  }

  const orderedFields = getOrderedFields().filter(key => record && (key in record));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b dark:border-dark-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Детали записи
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <dl className="space-y-4">
            {orderedFields.map((key) => (
              <div key={key} className="grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{key}</dt>
                <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                  {renderValue(key, record[key])}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}