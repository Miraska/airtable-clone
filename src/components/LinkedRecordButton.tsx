import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useQuery } from 'react-query';
import { LinkedRecord } from '../types/airtable';
import { getLinkedRecords, TABLES } from '../lib/airtable';

interface LinkedRecordButtonProps {
  records: LinkedRecord[];
  onClick: (e: React.MouseEvent, record: LinkedRecord) => void;
}

export function LinkedRecordButton({ records, onClick }: LinkedRecordButtonProps) {
  const { data: linkedRecords } = useQuery(
    ['linkedRecords', records.map(r => r.id).join(',')],
    () => getLinkedRecords(records[0].table, records.map(r => r.id)),
    {
      enabled: records.length > 0,
      retry: 1
    }
  );

  const getDisplayName = (record: LinkedRecord, linkedRecord: any) => {
    if (!linkedRecord) return record.id;

    switch (record.table) {
      case TABLES.MANAGERS:
        return linkedRecord.fields['Имя'] || record.id;
      case TABLES.CONTRACTORS:
        return linkedRecord.fields['Наименование'] || record.id;
      case TABLES.AGENTS:
        return linkedRecord.fields['Наименование'] || record.id;
      case TABLES.CLIENTS:
        return linkedRecord.fields['Наименование'] || record.id;
      case TABLES.COUNTRY:
        return linkedRecord.fields['Краткое название'] || record.id;
      case TABLES.SUBAGENTS:
        return linkedRecord.fields['Наименование'] || record.id;
      case TABLES.SUBAGENT_PAYERS:
        return linkedRecord.fields['Наименование'] || record.id;
      case TABLES.APPLICATIONS:
        return linkedRecord.fields['nomer zayavki'] || record.id;
      default:
        return record.id;
    }
  };

  return (
    <div className="space-y-1">
      {records.map((record) => {
        const linkedRecord = linkedRecords?.find(r => r.id === record.id);
        const displayName = getDisplayName(record, linkedRecord);
        
        return (
          <button
            key={record.id}
            onClick={(e) => onClick(e, record)}
            className="inline-flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline mr-2"
          >
            <span>{displayName}</span>
            <ExternalLink size={14} className="ml-1" />
          </button>
        );
      })}
    </div>
  );
}