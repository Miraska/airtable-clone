 import React from 'react';
import Select from 'react-select';
import { useQuery } from 'react-query';
import { api } from '../api';
import "../styles/select.css"

interface Option {
  value: string;
  label: string;
}

interface RelationshipSelectProps {
  type: 'orders' | 'managers' | 'agents' | 'contractors' | 'reviewers' | 'clients' | 'countries' | 'subagents' | 'subagentPayers';
  value: never[] | string[] | string | number[];
  onChange: (value: string[]) => void;
  isMulti?: boolean;
  placeholder?: string;
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
    return data.data.map((item: any) => {
      const obj = { value: item.id, label: item.name ?? item.id }
      return obj
    });
  }, [data]);

  const selectedOptions = options.filter((option) => {
    return value.includes(option.value)
  });

  return (
    <Select
      isMulti={isMulti}
      options={options}
      unstyled
      value={selectedOptions}
      onChange={(selected) => {
        const values = isMulti
          ? (selected as Option[]).map((option) => option.value)
          : [(selected as Option).value];
        onChange(values);
      }}
      isLoading={isLoading}
      placeholder={placeholder || `Выберите ${type}`}
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
};