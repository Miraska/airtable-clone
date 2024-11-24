import React, { useState } from 'react';
import { Database, ChevronDown, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { useQuery } from 'react-query';
import { getTables, TABLES } from '../lib/airtable';

interface SidebarProps {
  activeTable: string;
  onTableChange: (tableId: string) => void;
}

export function Sidebar({ activeTable, onTableChange }: SidebarProps) {
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);
  const { data: tables = [] } = useQuery('tables', getTables);

  const referencesTables = tables.filter(table => table.id !== TABLES.APPLICATIONS);

  const toggleReferences = () => {
    setIsReferencesOpen((prevState) => !prevState);
  };

  return (
    <aside className="w-64 bg-gray-900 dark:bg-dark-950 text-white h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Airtable Clone</h1>
        <p className="text-sm text-gray-400 mt-1">Управление данными</p>
      </div>
      
      <nav className="flex-1">
        <div className="space-y-1">
          {/* Applications */}
          <button
            onClick={() => onTableChange(TABLES.APPLICATIONS)}
            className={clsx(
              'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
              activeTable === TABLES.APPLICATIONS
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 dark:hover:bg-dark-800'
            )}
          >
            <Database size={20} />
            <span>Заявки</span>
          </button>

          {/* References Section */}
          <div className="mt-4">
            <button
              onClick={toggleReferences}
              className="w-full flex items-center justify-between px-4 py-2 text-gray-300 hover:bg-gray-800 dark:hover:bg-dark-800 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Database size={20} />
                <span>Справочники</span>
              </div>
              {isReferencesOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            <div
              className={clsx(
                'ml-4 mt-1 space-y-1 transition-all duration-300 ease-in-out',
                isReferencesOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              )}
            >
              {referencesTables.map((table) => (
                <button
                  key={table.id}
                  onClick={() => onTableChange(table.id)}
                  className={clsx(
                    'w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors text-sm',
                    activeTable === table.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 dark:hover:bg-dark-800'
                  )}
                >
                  <span>{table.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-800 dark:border-dark-800">
        <div className="text-sm text-gray-400">
          <p>Подключено к Airtable</p>
          <p className="truncate">База: {import.meta.env.VITE_AIRTABLE_BASE_ID}</p>
        </div>
      </div>
    </aside>
  );
}
