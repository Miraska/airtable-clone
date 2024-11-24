import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getTableData, TABLES } from '../../lib/airtable';
import { ApplicationFormData, ApplicationFormProps } from './types';
import { BasicInformation } from './sections/BasicInformation';
import { PaymentDetails } from './sections/PaymentDetails';
import { ProcessStatus } from './sections/ProcessStatus';
import { AdditionalInformation } from './sections/AdditionalInformation';
import { Documents } from './sections/Documents';
import { FinancialDetails } from './sections/FinancialDetails';

// Map Airtable data to form data
const mapAirtableToForm = (data: any): Partial<ApplicationFormData> => {
  if (!data) return {};

  return {
    id: data.id,
    status: data['Статус'] || '',
    nomerZayavki: data['nomer zayavki'] || '',
    manager: data['Менеджер'] || [],
    checker: data['Проверяющий'] || [],
    placementDate: data['Дата размещения'] || '',
    workStartDate: data['Взята в работу'] || '',
    contractor: data['Контрагент'] || [],
    agent: data['Агент'] || [],
    client: data['Клиент'] || [],
    clientInn: data['ИНН (from Клиент)'] || '',
    exporterImporterName: data['Наименование Экспортера (при импорте) / Импортера (при экспорте)'] || '',
    swiftCode: data['SWIFT код банка получателя (при импорте) / отправителя (при экспорте)'] || '',
    country: data['Страна'] || [],
    paymentTerms: data['Условия расчета'] || '',
    orderNumber: data['Номер поручения'] || '',
    orderSignedDate: data['Подписано поручение (для Совкомбанка)'] || '',
    currency: data['Валюта'] || '',
    amountInCurrency: data['Заявка в валюте'] || 0,
    vipClientTerms: data['Условия по VIP клиенту'] || '',
    bankCommissionPercent: data['Комиссия + %  банка'] || 0,
    letterOfCreditCommission: data['Комиссия + аккред'] || 0,
    escrowCommission: data['Комиссия+эскроу'] || 0,
    exchangeRate: data['Курс, руб'] || 0,
    exchangeRateFixDate: data['Дата фиксации курса'] || '',
    applicationAmountRubles: data['Сумма заявки в рублях'] || 0,
    hasLetterOfCredit: data['С аккредитивом'] || false,
    dealType: data['Вид сделки'] || '',
    hasReceivedPrimaryDocs: data['Получили первичные документы'] || false,
    invoiceIssuedDate: data['выставлен инвойс на поставщика (импорт) / на отправителя (экспорт)'] || '',
    agentContractSignedDate: data['подписан агент. / субагент. договор'] || '',
    bankRegistrationDate: data['поставлен на учет в банке'] || '',
    letterOfCreditOpenDate: data['Открыт аккредитив'] || '',
    currencyPaidDate: data['оплачена валюта поставщику (импорт) / субагенту (экспорт)'] || '',
    currencyReceivedDate: data['получена валюта поставщиком (импорт) / субагентом (экспорт)'] || '',
    rublesClientPaidDate: data['оплачен рубль клиенту (экспорт)'] || '',
    letterOfCreditDisclosedDate: data['аккредитив раскрыт'] || '',
    reportActSignedDate: data['подписан акт-отчет'] || '',
    dealClosedDate: data['сделка закрыта'] || '',
    dealCycleDays: data['Цикл сделки, дн'] || 0,
    paymentPurpose: data['Назначение платежа'] || '',
    subagent: data['Субагент'] || [],
    subagentPayer2: data['Плательщик Субагента 2'] || [],
    subagentPayerOrderNumber: data['Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)'] || 0,
    agentSubagentDocsDate: data['Подготовлены документы между агентом и субагентом (дата)'] || '',
    swiftReceivedDate: data['Получен SWIFT'] || '',
    swift103RequestedDate: data['Запросили SWIFT 103'] || '',
    swift199RequestedDate: data['Запросили SWIFT 199'] || '',
    swiftStatus: data['Статус SWIFT'] || '',
    moneyStuck: data['Зависли деньги'] || false,
    moneyStuckComments: data['комментарии к заявкам по которым зависли деньги'] || '',
    receivedAmount: data['Поступило на наш расчетный счет'] || 0,
    agentFee: data['Agentskoe voznagrazhdenie'] || '',
    remainingPayment: data['Ostatok k oplate'] || '',
    bank: data['Bank'] || '',
    comments: data['Kommentarii po zayavke'] || '',
    errors: data['Oshibki po zayavke'] || '',
    receivedAmountDate: data['Postupilo na nash raschetnyj schet data'] || '',
    agentFeeDate: data['Agentskoe voznagrazhdenie date'] || '',
    subagentPayer: data['Плательщик субагента'] || '',
    inProgress: data['В разработке'] || 0
  };
};

export function ApplicationForm({ initialData, onSubmit, onCancel }: ApplicationFormProps) {
  const form = useForm<ApplicationFormData>({
    defaultValues: mapAirtableToForm(initialData)
  });

  // Fetch data for linked records
  const { data: managers = [] } = useQuery(['records', TABLES.MANAGERS], () => 
    getTableData(TABLES.MANAGERS)
  );

  const { data: contractors = [] } = useQuery(['records', TABLES.CONTRACTORS], () => 
    getTableData(TABLES.CONTRACTORS)
  );

  const { data: agents = [] } = useQuery(['records', TABLES.AGENTS], () => 
    getTableData(TABLES.AGENTS)
  );

  const { data: clients = [] } = useQuery(['records', TABLES.CLIENTS], () => 
    getTableData(TABLES.CLIENTS)
  );

  const { data: countries = [] } = useQuery(['records', TABLES.COUNTRY], () => 
    getTableData(TABLES.COUNTRY)
  );

  const { data: subagents = [] } = useQuery(['records', TABLES.SUBAGENTS], () => 
    getTableData(TABLES.SUBAGENTS)
  );

  const { data: subagentPayers = [] } = useQuery(['records', TABLES.SUBAGENT_PAYERS], () => 
    getTableData(TABLES.SUBAGENT_PAYERS)
  );

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInformation
        form={form}
        managers={managers}
        contractors={contractors}
        agents={agents}
        clients={clients}
        countries={countries}
      />

      <PaymentDetails form={form} />
      <ProcessStatus form={form} />
      
      <AdditionalInformation
        form={form}
        subagents={subagents}
        subagentPayers={subagentPayers}
      />

      <Documents form={form} />
      <FinancialDetails form={form} />

      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          Отмена
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-dark-900"
        >
          Сохранить
        </button>
      </div>
    </form>
  );
}