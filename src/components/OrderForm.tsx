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
  { value: 'new', label: 'New' },
  { value: 'В процессе', label: 'In Progress' },
  { value: 'Завершен', label: 'Completed' },
  { value: 'Закрыт', label: 'Closed' },
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
          label="Order Number"
          type="number"
          {...register('order_number', { required: 'Order number is required' })}
          error={errors.order_number?.message}
        />

        <Controller
          name="status"
          control={control}
          rules={{ required: 'Status is required' }}
          render={({ field }) => (
            <FormField
              label="Status"
              options={statusOptions}
              {...field}
              error={errors.status?.message}
            />
          )}
        />

        <FormField
          label="Agency Name"
          {...register('name_agency', { required: 'Agency name is required' })}
          error={errors.name_agency?.message}
        />

        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <FormField
              label="Currency"
              options={currencyOptions}
              {...field}
            />
          )}
        />

        <FormField
          label="SWIFT Code"
          {...register('swift_code')}
        />

        <FormField
          label="Order Sum"
          type="number"
          {...register('sum_order')}
        />

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Managers
          </label>
          <Controller
            name="manager"
            control={control}
            render={({ field }) => (
              <RelationshipSelect
                type="managers"
                value={field.value || []}
                onChange={field.onChange}
                placeholder="Select managers"
              />
            )}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Agents
          </label>
          <Controller
            name="agent"
            control={control}
            render={({ field }) => (
              <RelationshipSelect
                type="agents"
                value={field.value || []}
                onChange={field.onChange}
                placeholder="Select agents"
              />
            )}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Clients
          </label>
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <RelationshipSelect
                type="clients"
                value={field.value || []}
                onChange={field.onChange}
                placeholder="Select clients"
              />
            )}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
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
                placeholder="Select country"
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
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};