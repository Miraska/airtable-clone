import React, { useState } from 'react';
import { RefreshCw, Plus, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { TableActions } from './TableActions';
import { useTableSort } from '../hooks/useTableSort';
import { useTableFilter } from '../hooks/useTableFilter';
import { CellModal } from './CellModal';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onRefresh: () => void;
  onAdd: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onView?: (item: any) => void;
  onCellUpdate?: (id: number, key: string, value: any) => Promise<void>;
  title: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  onRefresh,
  onAdd,
  onEdit,
  onDelete,
  onView,
  onCellUpdate,
  title,
}) => {
  const { sortedData, sortConfig, handleSort } = useTableSort(data || []);
  const { filteredData, searchTerm, setSearchTerm } = useTableFilter(sortedData);
  const [isRelationShip, setIsRelationShip] = useState(false);
  const [selectedCellRelationShip, setSelectedCellRelationShip] = useState<{
    data: any;
    column: Column;
    value?: any;
  } | null>(null);

  const [selectedCell, setSelectedCell] = useState<{
    data: any;
    column: Column;
    value?: any;
  } | null>(null);

  const renderCell = (item: any, column: Column) => {
    const value = item[column.key];
  
    if (column.render) {
      return column.render(value);
    }
    if (column.key === 'status') {
      return <StatusBadge status={value} />;
    }
    if (typeof value === 'boolean') {
      return value ? 'Да' : 'Нет';
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return "-";

      return (
        <div className="flex flex-wrap gap-2">
          {value.map((tag, index) => (
            <span
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleTagClick(item, column, tag);
              }}
              className="inline-flex items-center px-8 py-1 rounded-xl text-sm font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-pointer hover:text-gray-600 hover:bg-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      );
    }
    return value || '-';
  };
  
  // Обработчик кликов на тег
  const handleTagClick = (item: any, column: Column, tag: string) => {
    setIsRelationShip(true);
    setSelectedCell({ data: item, column, value: tag });
  };
  
  // Обработчик кликов на ячейку
  const handleCellClick = (item: any, column: Column) => {
    const value = item[column.key];
    setIsRelationShip(false);
    if (Array.isArray(value) || column.key == "id") {
      setSelectedCellRelationShip({ data: item, column });
      return; // Не открываем модальное окно при клике на элементы массива
    }
    setSelectedCell({ data: item, column });
  };

  const handleCellUpdate = async (value: any) => {
    if (selectedCell && onCellUpdate) {
      await onCellUpdate(selectedCell.data.id, selectedCell.column.key, value);
      setSelectedCell(null);
    }
  };

  return (
    <div className="flex flex-col h-full transition-all duration-300">
      <div className="sticky mx-a top-0 z-20 bg-white p-6 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{title}</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg dark:text-white border border-gray-300 dark:border-gray-500 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onRefresh}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors dark:hover:bg-gray-600"
                title="Refresh"
              >
                <RefreshCw size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={onAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus size={20} />
                <span>Добавить</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-500 transition-all">
            <thead className="bg-gray-50 dark:bg-gray-700" >
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className="px-6 py-5 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider whitespace-nowrap sticky top-0 bg-gray-50 dark:bg-gray-700"
                    onClick={() => column.sortable && handleSort(column.key)}
                    style={{ cursor: column.sortable ? 'pointer' : 'default' }}
                  >
                    <div className="flex items-center gap-1">
                      {column.label}
                      {column.sortable && (
                        <div className="flex flex-col">
                          <ChevronUp
                            size={12}
                            className={
                              sortConfig?.key === column.key &&
                              sortConfig?.direction === 'asc'
                                ? 'text-blue-600'
                                : 'text-gray-400 dark:text-gray-300'
                            }
                          />
                          <ChevronDown
                            size={12}
                            className={
                              sortConfig?.key === column.key &&
                              sortConfig?.direction === 'desc'
                                ? 'text-blue-600'
                                : 'text-gray-400 dark:text-gray-300'
                            }
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
                {(onView || onEdit || onDelete) && (
                  <th scope="col" className="relative px-6 py-3 sticky top-0 bg-gray-50 dark:bg-gray-700">
                    <span className="sr-only">Действия</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-600 divide-y divide-gray-200 dark:divide-gray-500">
              {Array.isArray(filteredData) && filteredData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-500">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400"
                      onClick={() => handleCellClick(item, column)}
                    >
                      {
                        renderCell(item, column)
                      }
                    </td>
                  ))}
                  {(onView || onEdit || onDelete) && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <TableActions
                        onView={() => onView?.(item)}
                        onEdit={() => onEdit?.(item)}
                        onDelete={() => onDelete?.(item)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCell && (
        <CellModal
          isOpen={!!selectedCell}
          onClose={() => setSelectedCell(null)}
          data={selectedCell.data}
          column={selectedCell.column}
          value={selectedCell.value}
          onSave={handleCellUpdate}
          isRelationShip={isRelationShip}
        />
      )}

      {selectedCellRelationShip && (
        <CellModal
          isOpen={!!selectedCellRelationShip}
          onClose={() => setSelectedCellRelationShip(null)}
          data={selectedCellRelationShip.data}
          column={selectedCellRelationShip.column}
          value={selectedCellRelationShip.value}
          onSave={handleCellUpdate}
          isRelationShip={isRelationShip}
        />
      )}
    </div>
  );
};