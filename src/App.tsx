import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DataTable } from './components/DataTable';
import { RecordModal } from './components/RecordModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeToggle } from './components/ThemeToggle';
import { LinkedRecord } from './types/airtable';
import { TABLES, TABLE_NAMES } from './lib/airtable';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
});

export default function App() {
  const [active, setActive] = useState<boolean>(true);
  const [activeTable, setActiveTable] = useState<string>(TABLES.APPLICATIONS);
  const [selectedRecord, setSelectedRecord] = useState<{
    id: string;
    table: string;
  } | null>(null);

  const handleLinkedRecordClick = (record: LinkedRecord) => {
    setSelectedRecord({
      id: record.id,
      table: record.table,
    });
  };

  const handleTableChange = (tableId: string) => {
    setActiveTable(tableId);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Header active={active} setActive={setActive} />
        <div className="flex h-screen bg-gray-100 dark:bg-dark-950 transition-all duration-300 ease-in-out">
          <div className={active ? 'references-enter' : 'references-exit'}>
            <Sidebar
              activeTable={activeTable}
              onTableChange={handleTableChange}
            />
          </div>
          <main className="flex-1 overflow-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                  {TABLE_NAMES[activeTable as keyof typeof TABLE_NAMES]}
                </h1>
                <p className="text-md text-gray-600 dark:text-gray-400">
                  Manage and view your {TABLE_NAMES[activeTable as keyof typeof TABLE_NAMES].toLowerCase()}
                </p>
              </div>
              <ThemeToggle />
            </div>

            <div className="bg-white dark:bg-dark-900 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl">
              <DataTable
                tableId={activeTable}
                onRecordClick={(id) => setSelectedRecord({ id, table: activeTable })}
                onLinkedRecordClick={handleLinkedRecordClick}
              />
            </div>
          </main>

          {selectedRecord && (
            <RecordModal
              tableId={selectedRecord.table}
              recordId={selectedRecord.id}
              onClose={() => setSelectedRecord(null)}
              onLinkedRecordClick={handleLinkedRecordClick}
            />
          )}
        </div>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
