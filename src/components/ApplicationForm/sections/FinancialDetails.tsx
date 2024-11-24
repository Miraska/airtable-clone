import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormSection } from '../FormSection';
import { FormField } from '../FormField';
import { ApplicationFormData } from '../types';
import { inputClassName, selectClassName, textareaClassName } from '../constants';
import { BANK_OPTIONS, REMAINING_PAYMENT_OPTIONS } from '../../../config/constants';

interface FinancialDetailsProps {
  form: UseFormReturn<ApplicationFormData>;
}

export function FinancialDetails({ form }: FinancialDetailsProps) {
  const { register } = form;

  return (
    <FormSection title="Финансовые детали">
      <FormField label="Поступило на наш расчетный счет">
        <input 
          type="number" 
          step="0.01" 
          {...register('receivedAmount')} 
          className={inputClassName}
          placeholder="0.00"
        />
      </FormField>

      <FormField label="Дата поступления на расчетный счет">
        <input type="date" {...register('receivedAmountDate')} className={inputClassName} />
      </FormField>

      <FormField label="Агентское вознаграждение">
        <input type="text" {...register('agentFee')} className={inputClassName} />
      </FormField>

      <FormField label="Дата агентского вознаграждения">
        <input type="date" {...register('agentFeeDate')} className={inputClassName} />
      </FormField>

      <FormField label="Остаток к оплате">
        <select {...register('remainingPayment')} className={selectClassName}>
          <option value="">Выберите значение</option>
          {REMAINING_PAYMENT_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Банк">
        <select {...register('bank')} className={selectClassName}>
          <option value="">Выберите банк</option>
          {BANK_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Комментарии по заявке" className="col-span-2">
        <textarea {...register('comments')} rows={4} className={textareaClassName} />
      </FormField>

      <FormField label="Ошибки по заявке" className="col-span-2">
        <textarea {...register('errors')} rows={4} className={textareaClassName} />
      </FormField>

      <FormField label="Плательщик субагента">
        <input type="text" {...register('subagentPayer')} className={inputClassName} />
      </FormField>

      <FormField label="В разработке">
        <input type="number" {...register('inProgress')} className={inputClassName} />
      </FormField>
    </FormSection>
  );
}