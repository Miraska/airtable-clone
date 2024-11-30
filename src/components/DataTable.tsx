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
  const [selectedCell, setSelectedCell] = useState<{
    data: any;
    column: Column;
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
      return value.join(', ');
    }
    return value || '-';
  };

  const handleCellClick = (item: any, column: Column) => {
    setSelectedCell({ data: item, column });
  };

  const handleCellUpdate = async (value: any) => {
    if (selectedCell && onCellUpdate) {
      await onCellUpdate(selectedCell.data.id, selectedCell.column.key, value);
      setSelectedCell(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-20 bg-white p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onRefresh}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw size={20} className="text-gray-600" />
              </button>
              <button
                onClick={onAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus size={20} />
                <span>Add New</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap sticky top-0 bg-gray-50"
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
                                : 'text-gray-400'
                            }
                          />
                          <ChevronDown
                            size={12}
                            className={
                              sortConfig?.key === column.key &&
                              sortConfig?.direction === 'desc'
                                ? 'text-blue-600'
                                : 'text-gray-400'
                            }
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
                {(onView || onEdit || onDelete) && (
                  <th scope="col" className="relative px-6 py-3 sticky top-0 bg-gray-50">
                    <span className="sr-only">Actions</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(filteredData) && filteredData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCellClick(item, column)}
                    >
                      {renderCell(item, column)}
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
          onEdit={() => {}}
          onSave={handleCellUpdate}
        />
      )}
    </div>
  );
};