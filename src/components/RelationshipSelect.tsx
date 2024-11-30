import React from 'react';
import Select from 'react-select';
import { useQuery } from 'react-query';
import { api } from '../api';

interface Option {
  value: string;
  label: string;
}

interface RelationshipSelectProps {
  type: 'managers' | 'agents' | 'clients' | 'countries' | 'subagents' | 'subagentPayers';
  value: string[];
  onChange: (value: string[]) => void;
  isMulti?: boolean;
  placeholder?: string;
}

interface IDataItem {
  id: number;
  name: string
}

export const RelationshipSelect: React.FC<RelationshipSelectProps> = ({
  type,
  value,
  onChange,
  isMulti = true,
  placeholder,
}) => {
  const { data, isLoading } = useQuery([type], () => api[type].getAll());

  const options: Option[] = React.useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((item: IDataItem) => ({
      value: item.id.toString(),
      label: item.name,
    }));
  }, [data]);

  const selectedOptions = options.filter((option) => 
    value.includes(option.value)
  );

  return (
    <Select
      isMulti={isMulti}
      options={options}
      value={selectedOptions}
      onChange={(selected) => {
        const values = isMulti
          ? (selected as Option[]).map((option) => option.value)
          : [(selected as Option).value];
        onChange(values);
      }}
      isLoading={isLoading}
      placeholder={placeholder || `Select ${type}`}
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
};