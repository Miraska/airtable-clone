import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { RelationshipSelect } from './RelationshipSelect';
import { FormField } from './FormField';
import type { IOrder } from '../types';

interface OrderFormProps {
  onSubmit: (data: Partial<IOrder>) => void;
  initialData?: Partial<IOrder>;
  isLoading?: boolean;
}

const statusOptions = [
  { value: 'Новый', label: 'Новый' },
  { value: 'В процессе', label: 'В процессе' },
  { value: 'Завершен', label: 'Завершен' },
  { value: 'Закрыт', label: 'Закрыт' },
];

const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'RUB', label: 'RUB' },
];

export const OrderForm: React.FC<OrderFormProps> = ({
  onSubmit,
  initialData = {},
  isLoading,
}) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Partial<IOrder>>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Номер Заявки"
          type="number"
          {...register('order_number', { required: 'Введите номер заявки' })}
          error={errors.order_number?.message}
        />

        <Controller
          name="status"
          control={control}
          rules={{ required: 'Введите статус' }}
          render={({ field }) => (
            <FormField
              label="Статус"
              options={statusOptions}
              {...field}
              error={errors.status?.message}
            />
          )}
        />

        <FormField
          label="Имя агента"
          {...register('name_agency', { required: 'Введите агента' })}
          error={errors.name_agency?.message}
        />

        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <FormField
              label="Валюта"
              options={currencyOptions}
              {...field}
            />
          )}
        />

        <FormField
          label="SWIFT Код"
          {...register('swift_code')}
        />

        <FormField
          label="Сумма заявки"
          type="number"
          {...register('sum_order')}
        />

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Менеджеры
          </label>
          <Controller
            name="manager"
            control={control}
            render={({ field }) => (
              <RelationshipSelect
                type="managers"
                value={field.value || []}
                onChange={field.onChange}
                placeholder="Выберите менеджера"
              />
            )}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Агенты
          </label>
          <Controller
            name="agent"
            control={control}
            render={({ field }) => (
              <RelationshipSelect
                type="agents"
                value={field.value || []}
                onChange={field.onChange}
                placeholder="Выберите агента"
              />
            )}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Клиенты
          </label>
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <RelationshipSelect
                type="clients"
                value={field.value || []}
                onChange={field.onChange}
                placeholder="Выберите клиента"
              />
            )}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Страны
          </label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <RelationshipSelect
                type="countries"
                value={[field.value || '']}
                onChange={(values) => field.onChange(values[0])}
                isMulti={false}
                placeholder="Выберите страну"
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Закрыть
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </form>
  );
};