import React, { useState } from 'react';
import { RefreshCw, Plus, Search, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { TableActions } from './TableActions';
import { useTableSort } from '../hooks/useTableSort';
import { useTableFilter } from '../hooks/useTableFilter';
import { CellModal } from './CellModal';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  type: string;
  render?: (value: any) => React.ReactNode;
  readonly?: boolean;
}

interface FileItem {
  id: number;
  name: string;
  link: string;
  type: string;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onRefresh: () => void;
  onAdd: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onView?: (item: any) => void;
  onCellUpdate?: (data: any) => void;
  title: string;
}

interface DataObject {
  [key: string]: any; // Позволяет объекту иметь любые ключи с любыми значениями
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
  function formatDate(dateString: string): string {
    const parts = dateString.split('-');
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }

  function formatDatesInArray(arr: DataObject[]): DataObject[] {
    return arr.map(item => {
        const formattedItem: DataObject = { ...item };

        for (const key in item) {
            if (
                typeof item[key] === "string" &&
                /^\d{4}-\d{2}-\d{2}$/.test(item[key] as string)
            ) {
              formattedItem[key] = formatDate(item[key] as string);
            }
        }

        return formattedItem;
    });
  }

  const formattedData = formatDatesInArray(data);

  const { sortedData, sortConfig, handleSort } = useTableSort(formattedData || []);
  const { filteredData, searchTerm, setSearchTerm } = useTableFilter(sortedData);
  const [isRelationShip, setIsRelationShip] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{
    data: any;
    column: Column;
    value?: any;
  } | null>(null);

  const handleTagClick = (item: any, column: Column, tag: string) => {
    setIsRelationShip(true);
    setSelectedCell({ data: item, column, value: tag });
  };

  const handleCellClick = (item: any, column: Column) => {
    setIsRelationShip(false);
    setSelectedCell({ data: item, column });
  };

  const handleCellUpdate = (value: any) => {
    if (selectedCell && onCellUpdate) {
      onCellUpdate(value);
      setSelectedCell(null);
    }
  };

  const renderCell = (item: any, column: Column) => {
    const value = item[column.key];

    if (column.render) {
      return column.render(value);
    }

    // Отображение статуса
    if (column.key === 'status') {
      return <StatusBadge status={value} />;
    }

    // Отображение boolean
    if (typeof value === 'boolean') {
      return value ? 'Да' : 'Нет';
    }

    // Если это массив не-файлов (например связи, теги и т.д.)
    if (Array.isArray(value) && column.type !== 'file') {
      if (value.length === 0) return '-';

      return (
        <div className="flex flex-wrap gap-2">
          {value.map((tag: any, index: number) => (
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

    // Если это файлы
    if (column.type === 'file') {
      // Ищем соответствующие файлы в item.files по типу ключа столбца
      const allFiles: FileItem[] = item.files || [];
      const matchedFiles = allFiles.filter(file => file.type === column.key);

      if (matchedFiles.length === 0) {
        return 'Нет файла';
      }

      return (
        <div className="flex flex-wrap gap-2">
          {matchedFiles.map((file: FileItem) => (
            <a
              key={file.id}
              href={file.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              onClick={(e) => e.stopPropagation()}
            >
              <FileText size={16} />
              <span className="underline">{file.name}</span>
            </a>
          ))}
        </div>
      );
    }

    // Обычные значения
    return value || '-';
  };

  return (
    <div className="flex flex-col h-full transition-all duration-300">
      <div className="sticky mx-a top-0 z-20 bg-white p-6 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus size={20} />
                <span>Добавить</span>
              </button>
              <button
                onClick={onRefresh}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors dark:hover:bg-gray-600"
                title="Refresh"
              >
                <RefreshCw size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск..."
                value={searchTerm}
                id='search'
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg dark:text-white border border-gray-300 dark:border-gray-500 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{title}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-500 transition-all">
            <thead className="bg-gray-50 dark:bg-gray-700" >
              <tr>
                {(onView || onEdit || onDelete) && (
                  <th scope="col" className="relative px-6 py-3 top-0 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-100 dark:bg-gray-700">
                    Действия
                  </th>
                )}
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
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-600 divide-y divide-gray-200 dark:divide-gray-500">
              {Array.isArray(filteredData) && filteredData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-500">
                  {(onView || onEdit || onDelete) && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <TableActions
                        onView={() => onView?.(item)}
                        onEdit={() => { onEdit?.(item) }}
                        onDelete={() => onDelete?.(item)}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400"
                      onClick={() => handleCellClick(item, column)}
                    >
                      {renderCell(item, column)}
                    </td>
                  ))}
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
          setSelectedCell={setSelectedCell}
        />
      )}
    </div>
  );
};
