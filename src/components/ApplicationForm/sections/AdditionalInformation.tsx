import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SearchableSelect } from '../../SearchableSelect';
import { FormSection } from '../FormSection';
import { FormField } from '../FormField';
import { ApplicationFormData } from '../types';
import { inputClassName, selectClassName, checkboxClassName, checkboxWrapperClassName, textareaClassName } from '../constants';
import { SWIFT_STATUS_OPTIONS } from '../../../config/constants';

interface AdditionalInformationProps {
  form: UseFormReturn<ApplicationFormData>;
  subagents: any[];
  subagentPayers: any[];
}

export function AdditionalInformation({
  form,
  subagents,
  subagentPayers
}: AdditionalInformationProps) {
  const { register, watch, setValue } = form;

  return (
    <FormSection title="Дополнительная информация">
      <FormField label="Назначение платежа" className="col-span-2">
        <textarea {...register('paymentPurpose')} rows={4} className={textareaClassName} />
      </FormField>

      <FormField label="Субагент">
        <SearchableSelect
          options={subagents.map(s => ({ id: s.id, label: s.Наименование }))}
          value={watch('subagent') || []}
          onChange={value => setValue('subagent', value)}
          onCreateNew={() => {}}
          isMulti={false}
          placeholder="Выберите субагента"
        />
      </FormField>

      <FormField label="Плательщик Субагента 2">
        <SearchableSelect
          options={subagentPayers.map(s => ({ id: s.id, label: s.Наименование }))}
          value={watch('subagentPayer2') || []}
          onChange={value => setValue('subagentPayer2', value)}
          onCreateNew={() => {}}
          isMulti={false}
          placeholder="Выберите плательщика"
        />
      </FormField>

      <FormField label="Порядковый номер заявления">
        <input 
          type="number" 
          {...register('subagentPayerOrderNumber')} 
          className={inputClassName}
          placeholder="Введите номер"
        />
      </FormField>

      <FormField label="Подготовлены документы между агентом и субагентом">
        <input type="date" {...register('agentSubagentDocsDate')} className={inputClassName} />
      </FormField>

      <FormField label="Получен SWIFT">
        <input type="date" {...register('swiftReceivedDate')} className={inputClassName} />
      </FormField>

      <FormField label="Запросили SWIFT 103">
        <input type="date" {...register('swift103RequestedDate')} className={inputClassName} />
      </FormField>

      <FormField label="Запросили SWIFT 199">
        <input type="date" {...register('swift199RequestedDate')} className={inputClassName} />
      </FormField>

      <FormField label="Статус SWIFT">
        <select {...register('swiftStatus')} className={selectClassName}>
          <option value="">Выберите статус</option>
          {SWIFT_STATUS_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Зависли деньги">
        <div className={checkboxWrapperClassName}>
          <input type="checkbox" {...register('moneyStuck')} className={checkboxClassName} />
        </div>
      </FormField>

      <FormField label="Комментарии к зависшим деньгам" className="col-span-2">
        <textarea {...register('moneyStuckComments')} rows={4} className={textareaClassName} />
      </FormField>
    </FormSection>
  );
}