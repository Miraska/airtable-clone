import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormSection } from '../FormSection';
import { FormField } from '../FormField';
import { ApplicationFormData } from '../types';
import { fileInputClassName } from '../constants';

interface DocumentsProps {
  form: UseFormReturn<ApplicationFormData>;
}

export function Documents({ form }: DocumentsProps) {
  const { register } = form;

  return (
    <FormSection title="Документы">
      <FormField label="Заявка">
        <input type="file" {...register('applicationFile')} className={fileInputClassName} />
      </FormField>

      <FormField label="Инвойс">
        <input type="file" {...register('invoiceFile')} className={fileInputClassName} />
      </FormField>

      <FormField label="Поручение">
        <input type="file" {...register('orderFile')} className={fileInputClassName} />
      </FormField>

      <FormField label="SWIFT">
        <input type="file" {...register('swiftFile')} className={fileInputClassName} />
      </FormField>

      <FormField label="SWIFT 103">
        <input type="file" {...register('swift103File')} className={fileInputClassName} />
      </FormField>

      <FormField label="SWIFT 199">
        <input type="file" {...register('swift199File')} className={fileInputClassName} />
      </FormField>

      <FormField label="Акт-отчет">
        <input type="file" {...register('reportActFile')} className={fileInputClassName} />
      </FormField>
    </FormSection>
  );
}