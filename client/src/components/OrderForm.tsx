import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { RelationshipSelect } from './RelationshipSelect';
import { FormField } from './FormField';
import type { IOrder } from '../types';
import { FormSelect } from './FormSelect';
import CountriesSelect from './CountriesSelect';

interface OrderFormProps {
  onSubmit: (data: IOrder) => void;
  onClose: () => void;
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

const swiftStatus = [
  { value: 'close', label: 'Заявка закрыта' },
  { value: 'return', label: 'Возврат' },
  { value: 'sucess', label: 'Деньги у получателя' },
];

export const OrderForm: React.FC<OrderFormProps> = ({
  onSubmit,
  onClose,
  isLoading,
}) => {
  const { register, handleSubmit, control } = useFormContext<IOrder>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name='order_number'
          control={control}
          render={({field}) => (
            <FormField
              label="№ Заявки"
              type="number"
              placeholder='Введите номер заявки'
              {...field}
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormSelect
              labelText="Статус"
              text='статус'
              value={field.value as string}
              onChange={field.onChange}
              options={statusOptions}
            />
          )}
        />

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">
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
          <label className="block text-sm font-medium mb-1">
            Проверяющий
          </label>
          <Controller
            name="reviewer"
            control={control}
            render={({ field }) => (
              <RelationshipSelect
                type="reviewers"
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
        />
        
        <FormField
          type='date'
          label='Взята в работу'
          {...register('date')}
        />
        
        <div className="col-span-2">
          <label className="block text-sm font-medium  mb-1">
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
          <label className="block text-sm font-medium  mb-1">
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
          <label className="block text-sm font-medium  mb-1">
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
          />
        </div>
        
        <div className='col-span-2'>
          <FormField
            type='text'
            label='Наименование экспортёра или импортёра'
            placeholder='Введите экспортёра или импортёра'
            {...register('name_agency')}
          />
        </div>
        
        <div className='col-span-2'>
          <FormField
            type='text'
            label='SWIFT код банка получателя (при импорте) / отправителя (при экспорте)'
            placeholder='Введите SWIFT код банка'
          />
        </div>
        
        <CountriesSelect/>
        
        <Controller
          name="calc_condition"
          control={control}
          render={({ field }) => (
            <FormSelect
              labelText="Условия расчета"
              text='условие расчета'
              value={field.value as string}
              onChange={field.onChange}
              options={statusOptions}
            />
          )}
        />
        
        <Controller
          name="type_transaction"
          control={control}
          render={({ field }) => (
            <FormSelect
              labelText="Вид сделки"
              text='вид сделки'
              options={statusOptions}
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        />
        
        <FormField
          label="Номер поручения"
          type='text'
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
          render={({ field }) => (
            <FormSelect
              labelText="Валюта"
              text='валюту'
              options={currencyOptions}
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        />
        
        <FormField
          label="Сумма заявки"
          type="number"
          {...register('sum_order')}
          placeholder='Введите сумму заявки'
        />
        
        <FormField
          label='Условия VIP'
          {...register('vip_condition')}
          type='text'
          placeholder='Введите условия VIP'
        />
        
        <FormField
          label='VIP комиссия'
          {...register('vip_commission')}
          type='text'
          placeholder='Введите VIP комиссию'
        />
        
        <FormField
          label='Скрытая комиссия'
          {...register('hide_commision')}
          type='text'
          placeholder='Введите скрытую комиссию'
        />
        
        <FormField
          label='Комиссия +% банка'
          {...register('commision_plus_percent')}
          type='text'
          placeholder='Введите комиссию +% банка'
        />
        
        <FormField
          label='Комиссия + аккред'
          {...register('commision_plus_accredit')}
          type='text'
          placeholder='Введите комиссию + аккред'
        />
        
        <FormField
          label='Комиссия + эксроу'
          {...register('commision_plus_escrow')}
          type='text'
          placeholder='Введите комиссию + эксроу'
        />
        
        <FormField
          label='Комиссия + эксроу'
          {...register('commision_plus_escrow')}
          type='text'
          placeholder='Введите комиссию + эксроу'
        />
        
        <FormField
          label='Курс'
          {...register('money_rate')}
          type='text'
          placeholder='Введите курс рубля (₽)'
        />
        
        <FormField
          label='Скрытый курс'
          {...register('hide_money_rate')}
          type='text'
          placeholder='Введите скрытый курс рубля (₽)'
        />
        
        <FormField
          label='Скрытый курс'
          {...register('hide_money_rate')}
          type='text'
          placeholder='Введите скрытый курс рубля (₽)'
        />
        
        <FormField
          type='date'
          label='Дата фиксации курса'
          {...register('date_fixation_rate')}
        />
        
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <label className='mr-6'>
              С аккредитивом
            </label>
            <FormField
              type='checkbox'
              {...register('letter_of_credit')}
            />
          </div>
          <div className='flex items-center justify-between'>
            <label className='mr-6'>
              Получили первич. док-ты
            </label>
            <FormField
              type='checkbox'
              {...register('take_first_doc')}
            />
          </div>
        </div>
        
        <FormField
          type='date'
          label='Выставлен инвойс на поставщика (импорт) / на отправителя (экспорт)'
          {...register('invoice')}
        />
        
        
        <FormField
          type='date'
          label='Подписан агент. / субагент. договор'
          {...register('date_contract_signed')}
        />
        
        <FormField
          type='date'
          label='Поставлен на учет в банке'
          {...register('date_reg_bank')}
        />
        
        
        <FormField
          type='date'
          label='Открыт аккредитив'
          {...register('date_open_letter_of_credit')}
        />
        
        <FormField
          type='date'
          label='Оплачена валюта поставщику (импорт) / субагенту (экспорт)'
          {...register('date_valet_agency')}
        />
        
        
        <FormField
          type='date'
          label='Получена валюта поставщиком (импорт) / субагентом (экспорт)'
          {...register('date_taking_agency')}
        />
        
        <FormField
          type='date'
          label='Оплачен рубль клиенту (экспорт)'
          {...register('date_paid_rub')}
        />
        
        
        <FormField
          type='date'
          label='Аккредитив раскрыт'
          {...register('date_unhide_letter_of_credit')}
        />
        
        <FormField
          type='date'
          label='Подписан акт-отчет'
          {...register('date_sign_act')}
        />
        
        
        <FormField
          type='date'
          label='Сделка закрыта'
          {...register('date_close_deal')}
        />
        
        <FormField
          label="Назначение платежа"
          type='text'
          placeholder='Введите назначение платежа'
          {...register('purpose_of_payment')}
        />
        
        <div className="col-span-2">
          <label className="block text-sm font-medium  mb-1">
            Субагент
          </label>
          <Controller
            name="subagent"
            control={control}
            render={({ field }) => (
              <RelationshipSelect
                type="subagents"
                value={field.value || []}
                onChange={field.onChange}
                placeholder="Выберите субагентов"
              />
            )}
          />
        </div>
        
        <div className="col-span-2">
          <label className="block text-sm font-medium  mb-1">
            Плательщик Субагента
          </label>
          <Controller
            name="subagents_payer"
            control={control}
            render={({ field }) => (
              <RelationshipSelect
                type="subagentPayers"
                value={field.value || []}
                onChange={field.onChange}
                placeholder="Выберите плательщика субагентов"
              />
            )}
          />
        </div>
        
        <div className="col-span-2">
          <FormField
            label="Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)"
            type='text'
            placeholder='Введите поряд-ый номер заявления'
            {...register('serial_num_for_payer')}
          />
        </div>
        
        <FormField
          type='date'
          label='Подготовлены документы между агентом и субагентом'
          {...register('date_docs_agent_and_subagent')}
        />
        
        <FormField
          type='date'
          label='Получен SWIFT'
          {...register('date_taking_swift')}
        />
        
        <FormField
          type='date'
          label='Запросили SWIFT 103'
          {...register('date_get_swift103')}
        />
        
        <FormField
          type='date'
          label='Получили SWIFT 103'
          {...register('date_take_swift103')}
        />
        
        <FormField
          type='date'
          label='Запросили SWIFT 199'
          {...register('date_get_swift199')}
        />
        
        <FormField
          type='date'
          label='Получили SWIFT 199'
          {...register('date_take_swift199')}
        />
        
        <FormField
          type='date'
          label='Возврат запрошен'
          {...register('date_refund')}
        />
        
        <FormField
          type='date'
          label='Деньги по возврату получены'
          {...register('date_take_refund')}
        />
        
        <Controller
          name="status_swift"
          control={control}
          render={({ field }) => (
            <FormSelect
              labelText="Статус SWIFT"
              text='Выберите статус SWIFT'
              options={swiftStatus}
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        />
        
        <div className="col-span-2">
          <FormField
            label="Заявка"
            type='text'
            placeholder='Введите ссылку на файл заявки'
            {...register('order_link')}
          />
        </div>
        
        <div className="col-span-2">
          <FormField
            label="Инвойс"
            type='text'
            placeholder='Введите ссылку на файл инвойса'
            {...register('order_link')}
          />
        </div>
        
        <div className="col-span-2">
          <FormField
            label="Поручение"
            type='text'
            placeholder='Введите ссылку на файл порученик'
            {...register('assignment_link')}
          />
        </div>
        
        <div className="col-span-2">
          <FormField
            label="SWIFT"
            type='text'
            placeholder='Введите ссылку на файл SWIFT'
            {...register('swift_link')}
          />
        </div>
        
        <div className="col-span-2">
          <FormField
            label="SWIFT 103"
            type='text'
            placeholder='Введите ссылку на файл SWIFT 103'
            {...register('swift103_link')}
          />
        </div>
        
        <div className="col-span-2">
          <FormField
            label="SWIFT 199"
            type='text'
            placeholder='Введите ссылку на файл SWIFT 199'
            {...register('swift199_link')}
          />
        </div>
        
        <div className="col-span-2">
          <FormField
            label="Акт-отчет"
            type='text'
            placeholder='Введите ссылку на файл Акт-отчета'
            {...register('act_link')}
          />
        </div>
        
        <div className="col-span-2">
          <FormField
            label="Акт-отчет"
            type='text'
            placeholder='Введите ссылку на файл Акт-отчета'
            {...register('act_link')}
          />
        </div>
        
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <label className='mr-6'>
              Сели деньги
            </label>
            <FormField
              type='checkbox'
              {...register('money_gone')}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 text-white"
        >
          Закрыть
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md transition-all duration-300 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </form>
  );
};