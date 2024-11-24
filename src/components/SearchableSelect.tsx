import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, X } from 'lucide-react';
import clsx from 'clsx';

interface Option {
  id: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  onCreateNew: (label: string) => void;
  placeholder?: string;
  className?: string;
  isMulti?: boolean;
}

export function SearchableSelect({
  options = [],
  value = [],
  onChange,
  onCreateNew,
  placeholder = 'Search...',
  className,
  isMulti = false,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newOptionLabel, setNewOptionLabel] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsCreating(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options?.filter(option =>
    option?.label?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const selectedOptions = options?.filter(option => 
    value?.includes(option.id)
  ) || [];

  const handleSelect = (optionId: string) => {
    if (isMulti) {
      const newValue = value?.includes(optionId)
        ? value.filter(id => id !== optionId)
        : [...(value || []), optionId];
      onChange(newValue);
    } else {
      onChange([optionId]);
      setIsOpen(false);
    }
  };

  const handleCreateNew = () => {
    if (newOptionLabel.trim()) {
      onCreateNew(newOptionLabel.trim());
      setNewOptionLabel('');
      setIsCreating(false);
      setSearch('');
    }
  };

  const handleRemove = (optionId: string) => {
    onChange(value?.filter(id => id !== optionId) || []);
  };

  return (
    <div ref={containerRef} className={clsx('relative', className)}>
      <div
        className="min-h-[38px] w-full rounded-md border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {selectedOptions.length > 0 ? (
          <div className="flex flex-wrap gap-1 p-1">
            {selectedOptions.map(option => (
              <div
                key={option.id}
                className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded px-2 py-1 text-sm"
              >
                <span>{option.label}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(option.id);
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-3 py-2 text-gray-500 dark:text-gray-400">
            {placeholder}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-dark-800 rounded-md shadow-lg border border-gray-200 dark:border-dark-700">
          <div className="p-2 border-b dark:border-dark-700">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-dark-900 rounded-md px-2">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full py-2 bg-transparent border-none focus:ring-0 text-sm"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-60 overflow-auto">
            {filteredOptions.map(option => (
              <div
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={clsx(
                  'px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-dark-700',
                  value?.includes(option.id) && 'bg-blue-50 dark:bg-blue-900'
                )}
              >
                {option.label}
              </div>
            ))}

            {search && !filteredOptions.length && !isCreating && (
              <div
                onClick={() => setIsCreating(true)}
                className="px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-dark-700 flex items-center gap-2 text-blue-600 dark:text-blue-400"
              >
                <Plus size={18} />
                <span>Create "{search}"</span>
              </div>
            )}

            {!filteredOptions.length && !search && (
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                No options available
              </div>
            )}
          </div>

          {isCreating && (
            <div className="p-2 border-t dark:border-dark-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newOptionLabel}
                  onChange={(e) => setNewOptionLabel(e.target.value)}
                  placeholder="Enter name..."
                  className="flex-1 px-3 py-1 rounded-md border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-sm"
                  autoFocus
                />
                <button
                  onClick={handleCreateNew}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}