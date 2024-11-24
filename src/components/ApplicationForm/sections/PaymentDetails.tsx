import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormSection } from '../FormSection';
import { FormField } from '../FormField';
import { ApplicationFormData } from '../types';
import { inputClassName, selectClassName, checkboxClassName, checkboxWrapperClassName } from '../constants';
import { PAYMENT_TERMS_OPTIONS, CURRENCY_OPTIONS, DEAL_TYPE_OPTIONS } from '../../../config/constants';

interface PaymentDetailsProps {
  form: UseFormReturn<ApplicationFormData>;
}

export function PaymentDetails({ form }: PaymentDetailsProps) {
  const { register } = form;

  return (
    <FormSection title="Детали платежа">
      <FormField label="Условия расчета" required>
        <select {...register('paymentTerms')} className={selectClassName}>
          <option value="">Выберите условия</option>
          {PAYMENT_TERMS_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Номер поручения">
        <input type="text" {...register('orderNumber')} className={inputClassName} />
      </FormField>

      <FormField label="Подписано поручение (для Совкомбанка)">
        <input type="date" {...register('orderSignedDate')} className={inputClassName} />
      </FormField>

      <FormField label="Валюта" required>
        <select {...register('currency')} className={selectClassName}>
          <option value="">Выберите валюту</option>
          {CURRENCY_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Заявка в валюте" required>
        <input 
          type="number" 
          step="0.01" 
          {...register('amountInCurrency')} 
          className={inputClassName}
          placeholder="0.00"
        />
      </FormField>

      <FormField label="Условия по VIP клиенту">
        <input type="text" {...register('vipClientTerms')} className={inputClassName} />
      </FormField>

      <FormField label="Комиссия + % банка">
        <input 
          type="number" 
          step="0.01" 
          {...register('bankCommissionPercent')} 
          className={inputClassName}
          placeholder="0.00"
        />
      </FormField>

      <FormField label="Комиссия + аккредитив">
        <input 
          type="number" 
          step="0.01" 
          {...register('letterOfCreditCommission')} 
          className={inputClassName}
          placeholder="0.00"
        />
      </FormField>

      <FormField label="Комиссия + эскроу">
        <input 
          type="number" 
          step="0.01" 
          {...register('escrowCommission')} 
          className={inputClassName}
          placeholder="0.00"
        />
      </FormField>

      <FormField label="Курс, руб">
        <input 
          type="number" 
          step="0.01" 
          {...register('exchangeRate')} 
          className={inputClassName}
          placeholder="0.00"
        />
      </FormField>

      <FormField label="Дата фиксации курса">
        <input type="date" {...register('exchangeRateFixDate')} className={inputClassName} />
      </FormField>

      <FormField label="Сумма заявки в рублях" disabled>
        <input type="number" {...register('applicationAmountRubles')} className={inputClassName} disabled />
      </FormField>

      <FormField label="С аккредитивом">
        <div className={checkboxWrapperClassName}>
          <input type="checkbox" {...register('hasLetterOfCredit')} className={checkboxClassName} />
        </div>
      </FormField>

      <FormField label="Вид сделки" required>
        <select {...register('dealType')} className={selectClassName}>
          <option value="">Выберите вид сделки</option>
          {DEAL_TYPE_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </FormField>
    </FormSection>
  );
}