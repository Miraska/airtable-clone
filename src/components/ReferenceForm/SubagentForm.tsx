import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { FormField } from './FormField';
import { inputClassName } from './styles';
import { SearchableSelect } from '../SearchableSelect';
import { getTableData, TABLES } from '../../lib/airtable';

interface SubagentFormData {
  name: string;
  payer: string[];
}

interface SubagentFormProps {
  initialData?: any;
  onSubmit: (data: SubagentFormData) => void;
  onCancel: () => void;
}

export function SubagentForm({ initialData, onSubmit, onCancel }: SubagentFormProps) {
  const { register, handleSubmit, watch, setValue } = useForm<SubagentFormData>({
    defaultValues: {
      name: initialData?.['Наименование'] || '',
      payer: initialData?.['Плательщик Субагента'] || []
    }
  });

  const { data: subagentPayers = [] } = useQuery(['records', TABLES.SUBAGENT_PAYERS], () => 
    getTableData(TABLES.SUBAGENT_PAYERS)
  );

  const handleFormSubmit = (data: SubagentFormData) => {
    onSubmit({
      'Наименование': data.name,
      'Плательщик Субагента': data.payer
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <FormField label="Наименование" required>
          <input type="text" {...register('name')} className={inputClassName} />
        </FormField>

        <FormField label="Плательщик Субагента">
          <SearchableSelect
            options={subagentPayers.map(p => ({ id: p.id, label: p.Наименование }))}
            value={watch('payer') || []}
            onChange={value => setValue('payer', value)}
            onCreateNew={() => {}}
            isMulti={false}
            placeholder="Выберите плательщика"
          />
        </FormField>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          Отмена
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-dark-900"
        >
          Сохранить
        </button>
      </div>
    </form>
  );
}