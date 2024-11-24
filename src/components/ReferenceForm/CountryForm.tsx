import React from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from './FormField';
import { inputClassName } from './styles';

interface CountryFormData {
  shortName: string;
  code: number;
  fullName: string;
}

interface CountryFormProps {
  initialData?: any;
  onSubmit: (data: CountryFormData) => void;
  onCancel: () => void;
}

export function CountryForm({ initialData, onSubmit, onCancel }: CountryFormProps) {
  const { register, handleSubmit } = useForm<CountryFormData>({
    defaultValues: {
      shortName: initialData?.['Краткое название'] || '',
      code: initialData?.['Код'] || undefined,
      fullName: initialData?.['Полное наименование'] || ''
    }
  });

  const handleFormSubmit = (data: CountryFormData) => {
    onSubmit({
      'Краткое название': data.shortName,
      'Код': data.code,
      'Полное наименование': data.fullName
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <FormField label="Краткое название" required>
          <input type="text" {...register('shortName')} className={inputClassName} />
        </FormField>

        <FormField label="Код">
          <input type="number" {...register('code')} className={inputClassName} />
        </FormField>

        <FormField label="Полное наименование" className="col-span-2">
          <input type="text" {...register('fullName')} className={inputClassName} />
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