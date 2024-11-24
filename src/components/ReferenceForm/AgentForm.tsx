import React from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from './FormField';
import { inputClassName } from './styles';

interface AgentFormData {
  name: string;
}

interface AgentFormProps {
  initialData?: any;
  onSubmit: (data: AgentFormData) => void;
  onCancel: () => void;
}

export function AgentForm({ initialData, onSubmit, onCancel }: AgentFormProps) {
  const { register, handleSubmit } = useForm<AgentFormData>({
    defaultValues: {
      name: initialData?.['Наименование'] || ''
    }
  });

  const handleFormSubmit = (data: AgentFormData) => {
    onSubmit({
      'Наименование': data.name
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <FormField label="Наименование" required>
        <input type="text" {...register('name')} className={inputClassName} />
      </FormField>

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