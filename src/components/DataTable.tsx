import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Plus } from 'lucide-react';
import { getTableSchema, getTableData, TABLES, COLUMN_NAMES } from '../lib/airtable';
import { LinkedRecord } from '../types/airtable';
import { LinkedRecordButton } from './LinkedRecordButton';
import { ApplicationFormModal } from './ApplicationFormModal';

interface DataTableProps {
  tableId: string;
  onRecordClick: (id: string) => void;
  onLinkedRecordClick: (record: LinkedRecord) => void;
}

export function DataTable({ tableId, onRecordClick, onLinkedRecordClick }: DataTableProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: schema = [] } = useQuery(
    ['schema', tableId],
    () => getTableSchema(tableId),
    { retry: 1 }
  );

  const { data: records = [] } = useQuery(
    ['records', tableId],
    () => getTableData(tableId),
    { retry: 1 }
  );

  const handleCellClick = (e: React.MouseEvent, recordId: string) => {
    e.stopPropagation();
    onRecordClick(recordId);
  };

  const handleCreateRecord = async (data: any) => {
    try {
      // TODO: Implement record creation
      console.log('Creating record:', data);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  const renderCell = (record: any, field: any) => {
    const value = record[field.name];

    if (!value) return null;

    if (field.type === 'foreignKey') {
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

  return (
    <>
      <div className="overflow-x-auto">
        {tableId === TABLES.APPLICATIONS && (
          <div className="p-2 border-b dark:border-dark-800">
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-3 py-1.5 text-sm border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-dark-900"
            >
              <Plus size={16} className="mr-1.5" />
              Новая заявка
            </button>
          </div>
        )}

        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-800">
          <thead className="bg-gray-50 dark:bg-dark-900">
            <tr>
              {schema.map((field) => (
                <th
                  key={field.name}
                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap"
                >
                  {COLUMN_NAMES[field.name] || field.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-900 divide-y divide-gray-200 dark:divide-dark-800">
            {records.map((record) => (
              <tr
                key={record.id}
                onClick={(e) => handleCellClick(e, record.id)}
                className="hover:bg-gray-50 dark:hover:bg-dark-800 cursor-pointer transition-colors"
              >
                {schema.map((field) => (
                  <td
                    key={field.name}
                    className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                  >
                    {renderCell(record, field)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ApplicationFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateRecord}
      />
    </>
  );
}