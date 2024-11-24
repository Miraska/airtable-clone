import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormSection } from '../FormSection';
import { FormField } from '../FormField';
import { ApplicationFormData } from '../types';
import { inputClassName, checkboxClassName, checkboxWrapperClassName } from '../constants';

interface ProcessStatusProps {
  form: UseFormReturn<ApplicationFormData>;
}

export function ProcessStatus({ form }: ProcessStatusProps) {
  const { register } = form;

  return (
    <FormSection title="Статус процесса">
      <FormField label="Получили первичные документы">
        <div className={checkboxWrapperClassName}>
          <input type="checkbox" {...register('hasReceivedPrimaryDocs')} className={checkboxClassName} />
        </div>
      </FormField>

      <FormField label="Выставлен инвойс">
        <input type="date" {...register('invoiceIssuedDate')} className={inputClassName} />
      </FormField>

      <FormField label="Подписан агент./субагент. договор">
        <input type="date" {...register('agentContractSignedDate')} className={inputClassName} />
      </FormField>

      <FormField label="Поставлен на учет в банке">
        <input type="date" {...register('bankRegistrationDate')} className={inputClassName} />
      </FormField>

      <FormField label="Открыт аккредитив">
        <input type="date" {...register('letterOfCreditOpenDate')} className={inputClassName} />
      </FormField>

      <FormField label="Оплачена валюта">
        <input type="date" {...register('currencyPaidDate')} className={inputClassName} />
      </FormField>

      <FormField label="Получена валюта">
        <input type="date" {...register('currencyReceivedDate')} className={inputClassName} />
      </FormField>

      <FormField label="Оплачен рубль клиенту">
        <input type="date" {...register('rublesClientPaidDate')} className={inputClassName} />
      </FormField>

      <FormField label="Аккредитив раскрыт">
        <input type="date" {...register('letterOfCreditDisclosedDate')} className={inputClassName} />
      </FormField>

      <FormField label="Подписан акт-отчет">
        <input type="date" {...register('reportActSignedDate')} className={inputClassName} />
      </FormField>

      <FormField label="Сделка закрыта">
        <input type="date" {...register('dealClosedDate')} className={inputClassName} />
      </FormField>

      <FormField label="Цикл сделки, дн" disabled>
        <input type="number" {...register('dealCycleDays')} className={inputClassName} disabled />
      </FormField>
    </FormSection>
  );
}