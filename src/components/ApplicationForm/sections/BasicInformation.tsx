import { UseFormReturn } from 'react-hook-form';
import { SearchableSelect } from '../../SearchableSelect';
import { FormSection } from '../FormSection';
import { FormField } from '../FormField';
import { ApplicationFormData } from '../types';
import { inputClassName, selectClassName } from '../constants';
import { STATUS_OPTIONS } from '../../../config/constants';

interface BasicInformationProps {
  form: UseFormReturn<ApplicationFormData>;
  managers: any[];
  contractors: any[];
  agents: any[];
  clients: any[];
  countries: any[];
}

export function BasicInformation({
  form,
  managers,
  contractors,
  agents,
  clients,
  countries
}: BasicInformationProps) {
  const { register, watch, setValue } = form;

  return (
    <FormSection title="Основная информация">
      <FormField label="Автономер" disabled>
        <input type="text" disabled className={inputClassName} />
      </FormField>

      <FormField label="Статус" required>
        <select {...register('status')} className={selectClassName}>
          <option value="">Выберите статус</option>
          {STATUS_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Номер заявки" required>
        <input type="text" {...register('nomerZayavki')} className={inputClassName} />
      </FormField>

      <FormField label="Менеджер" required>
        <SearchableSelect
          options={managers.map(m => ({ id: m.id, label: m.Имя }))}
          value={watch('manager') || []}
          onChange={value => setValue('manager', value)}
          onCreateNew={() => {}}
          isMulti={false}
          placeholder="Выберите менеджера"
        />
      </FormField>

      <FormField label="Проверяющий">
        <SearchableSelect
          options={managers.map(m => ({ id: m.id, label: m.Имя }))}
          value={watch('checker') || []}
          onChange={value => setValue('checker', value)}
          onCreateNew={() => {}}
          isMulti={false}
          placeholder="Выберите проверяющего"
        />
      </FormField>

      <FormField label="Дата размещения" required>
        <input type="date" {...register('placementDate')} className={inputClassName} />
      </FormField>

      <FormField label="Взята в работу">
        <input type="date" {...register('workStartDate')} className={inputClassName} />
      </FormField>

      <FormField label="Контрагент" required>
        <SearchableSelect
          options={contractors.map(c => ({ id: c.id, label: c.Наименование }))}
          value={watch('contractor') || []}
          onChange={value => setValue('contractor', value)}
          onCreateNew={() => {}}
          isMulti={false}
          placeholder="Выберите контрагента"
        />
      </FormField>

      <FormField label="Агент" required>
        <SearchableSelect
          options={agents.map(a => ({ id: a.id, label: a.Наименование }))}
          value={watch('agent') || []}
          onChange={value => setValue('agent', value)}
          onCreateNew={() => {}}
          isMulti={false}
          placeholder="Выберите агента"
        />
      </FormField>

      <FormField label="Клиент" required>
        <SearchableSelect
          options={clients.map(c => ({ id: c.id, label: c.Наименование }))}
          value={watch('client') || []}
          onChange={value => setValue('client', value)}
          onCreateNew={() => {}}
          isMulti={false}
          placeholder="Выберите клиента"
        />
      </FormField>

      <FormField label="ИНН клиента" disabled>
        <input type="text" {...register('clientInn')} className={inputClassName} disabled />
      </FormField>

      <FormField label="Наименование Экспортера/Импортера" required>
        <input 
          type="text" 
          {...register('exporterImporterName')} 
          className={inputClassName}
          placeholder="Введите наименование экспортера/импортера"
        />
      </FormField>

      <FormField label="SWIFT код банка" required>
        <input 
          type="text" 
          {...register('swiftCode')} 
          className={inputClassName}
          placeholder="Введите SWIFT код"
        />
      </FormField>

      <FormField label="Страна" required>
        <SearchableSelect
          options={countries.map(c => ({ id: c.id, label: c['Краткое название'] }))}
          value={watch('country') || []}
          onChange={value => setValue('country', value)}
          onCreateNew={() => {}}
          isMulti={false}
          placeholder="Выберите страну"
        />
      </FormField>
    </FormSection>
  );
}