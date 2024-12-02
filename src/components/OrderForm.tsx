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
          label="№ Заявки"
          type="number"
          placeholder='Введите номер заявки'
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
              selectText='статус'
              options={statusOptions}
              {...field}
              error={errors.status?.message}
            />
          )}
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
            Проверяющий
          </label>
          <Controller
            name="manager"
            control={control}
            render={({ field }) => (
              <RelationshipSelect
                type="managers"
                value={field.value || []}
                onChange={field.onChange}
                placeholder="Выберите проверяющего"
              />
            )}
          />
        </div>
        
        <FormField
          type='date'
          label='Дата Размещения'
          {...register('date')}
          error={ errors.date?.message }
        />
        
        <FormField
          type='date'
          label='Взята в работу'
          {...register('date')}
          error={ errors.date?.message }
        />
        
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Контрагент
          </label>
          <Controller
            name="contragent"
            control={control}
            render={({ field }) => (
              <RelationshipSelect
                type="agents"
                value={field.value || []}
                onChange={field.onChange}
                placeholder="Выберите контрагента"
              />
            )}
          />
        </div>
        
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Агент
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
            Клиент
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
        
        <div className='col-span-2'>
          <FormField
            type="text"
            label="ИНН (from Клиент)"
            placeholder='Введите инн'
            {...register('client_inn')}
            error={errors.name_agency?.message}
          />
        </div>
        
        <div className='col-span-2'>
          <FormField
            type='text'
            label='Наименование экспортёра или импортёра'
            placeholder='Введите экспортёра или импортёра'
            {...register('name_agency')}
            error={errors.name_agency?.message}
          />
        </div>
        
        <div className='col-span-2'>
          <FormField
            type='text'
            label='SWIFT код банка получателя (при импорте) / отправителя (при экспорте)'
            placeholder='Введите SWIFT код банка'
          />
        </div>
        
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Страна
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
        
        <Controller
          name="calc_condition"
          control={control}
          rules={{ required: 'Ввыберите условие' }}
          render={({ field }) => (
            <FormField
              label="Условия расчета"
              selectText='условие расчета'
              options={statusOptions}
              {...field}
              error={errors.status?.message}
            />
          )}
        />
        
        <Controller
          name="type_transaction"
          control={control}
          rules={{ required: 'Выберите вид сделки' }}
          render={({ field }) => (
            <FormField
              label="Вид сделки"
              selectText='вид сделки'
              options={statusOptions}
              {...field}
              error={errors.status?.message}
            />
          )}
        />
        
        <FormField
          label="Номер поручения"
          {...register('number_receiving')}
          placeholder='Введите номер поручения'
        />
        
        <FormField
          label="Подписано поручение"
          {...register('number_receiving')}
          type='date'
        />
        
        <Controller
          name="currency"
          control={control}
          rules={{ required: 'currency' }}
          render={({ field }) => (
            <FormField
              label="Валюта"
              selectText='валюту'
              options={currencyOptions}
              {...field}
              error={errors.status?.message}
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