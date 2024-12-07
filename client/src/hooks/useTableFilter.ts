import { useState, useMemo } from 'react';

export function useTableFilter<T>(data: T[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm || !Array.isArray(data)) return data;

    return data.filter((item) =>
      Object.values(item as any).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  return {
    filteredData,
    searchTerm,
    setSearchTerm,
  };
}