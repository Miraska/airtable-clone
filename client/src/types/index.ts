export interface IOrder { // ЗАЯВКИ
  id?: number; // (уникальный)
  autonumber: number | null, // Автономер (по порядку)
  status: string | null, // Статус (закрыта, открыта, в работе и т. д.)
  order_number: number | null, // Номер (№) заявки
  manager: number[] | null, // Менеджеры (может хранится много менеджеров которые в другой таблице)
  reviewer: number[] | null, // Проверяющие (может хранится много менеджеров которые в другой таблице)
  date: string | null, // Дата размещения (дата)
  date_hired: string | null, // Взята в работу (дата)
  contragent: string | null, // Контрагент (может хранится много контрагентов из таблицы контрагенты)
  agent: number[] | null, // Агент (может хранится много агентов из таблицы агенты)
  client: number[] | null, // Клиент (может хранится много клиентов из таблицы клиенты)
  client_inn: string | null, // ИНН (от клиента из таблицы клиентов)
  name_agency: string | null, // Наименование экспортёра или импортёра
  swift_code: string | null, // SWIFT Код банка получателя или отправителя
  country: number[] | null, // Страна (может хранится 1 страна из таблицы стран)
  calc_condition: string | null, // Условия расчета
  type_transaction: string | null, // Вид сделки
  number_receiving: number | null, // Номер поручения
  date_instruction: string | null, // Подписано поручение (дата)
  currency: string | null, // Валюта
  sum_order: number | null, // Сумма заявки
  vip_condition: string | null, // Условия VIP
  vip_commission: number | null, // VIP комиссия
  hide_commission: number | null,  // Скрытая комиссия
  commision_plus_percent: number | null, // Комиссия +% банка
  commision_plus_accredit: number | null, // Комиссия + аккредитив
  commision_plus_escrow: number | null, // Комиссия + эскроу
  money_rate: number | null, // Курс
  hide_money_rate: number | null, // Скрытый курс
  date_fixation_rate: string | null, // Дата фиксации курса
  order_rate_rub: number | null, // Заявка по курсу в рублях
  agency_award: number | null, // Агентское вознаграждение
  real_award: number | null, // Фактическое вознаграждение
  not_ours_award: number | null, // Агентское не наше
  sum: number | null, // ИТОГО
  letter_of_credit: boolean | null, // С аккредитивом
  take_first_doc: boolean | null, // Получили первичные документы
  invoice: string | null, // Инвойс
  date_contract_signed: string | null, // Подписан агент. / субагент. договор
  date_reg_bank: string | null, // Поставлен на учет в банке
  date_open_letter_of_credit: string | null, // Открыт аккредитив
  date_valet_agency: string | null, // Оплачена валюта поставщику (импорт) / субагенту (экспорт)
  date_taking_agency: string | null, // Получена валюта поставщиком (импорт) / субагентом (экспорт)
  date_paid_rub: string | null, // Оплачен рубль клиенту (экспорт)
  date_unhide_letter_of_credit: string | null, // Аккредитив раскрыт
  date_sign_act: string | null, // Подписан акт-отчет
  date_close_deal: string | null, // Сделка закрыта
  cycle_deal: number | null, // Цикл сделки, дн
  purpose_of_payment: string | null, // Назначение платежа
  subagent: number[] | null, // Субагент (может хранится субагент из таблицы субагентов)
  subagents_payer: number[] | null, // Плательщик Субагента (может хранится плательщик субагента из таблицы плательщик субагентов)
  serial_num_for_payer: number | null, // Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)
  date_docs_agent_and_subagent: string | null, // Подготовлены документы между агентом и субагентом (дата)
  date_taking_swift: string | null, // Получен SWIFT
  date_get_swift103: string | null, // Запросили SWIFT 103
  date_take_swift103: string | null, // Получили SWIFT 103
  date_get_swift199: string | null, // Запросили SWIFT 199
  date_take_swift199: string | null, // Получили SWIFT 199
  date_refund: string | null, // Возврат запрошен
  date_take_refund: string | null, // Деньги по возврату получены
  status_swift: string | null, // Статус SWIFT
  stuck_money: boolean | null, // Зависли деньги
  stage_problem: string | null, // Стадии проблемы
  comment_problem: string | null, // Комментарии к заявкам по которым зависли деньги
  stuck_money_name: string | null, // Какая валюта зависла?
  stuck_money_sum: number | null, // Сумма зависла
  mistake_is_it_name: string | null, // Чья ошибка?
  order_link: string | null, // Заявка ссылка
  invoice_link: string | null, // Инвойс ссылка
  assignment_link: string | null, // Поручение ссылка
  swift_link: string | null, // SWIFT ссылка
  swift103_link: string | null, // SWIFT 103 ссылка
  swift199_link: string | null, // SWIFT 199 ссылка
  act_link: string | null, // Акт-отчет ссылка
  money_gone: boolean | null // Сели деньги
}

export interface IAgent {
  id?: number;
  name: string | null;
  orders: number[] | null | string;
}

export interface IClient {
  id?: number;
  name: string;
  inn: number | null | string;
  orders: number[] | null | string;
}

export interface IContragent {
  id?: number;
  name: string | null;
  orders: number[] | null | string;
}

export interface ICountry {
  id?: number;
  name: string | null;
  code: number | null | string;
  full_name: string | null;
  orders: number[] | null | string;
}

export interface IManager {
  id?: number;
  name: string | null;
  tel: string | null;
  date: string | null;
  orders: string[] | null;
  review_table: number[] | null | string;
}

export interface ISubagentPayer {
  id?: number;
  name: string | null;
  subagents: string[] | null | string;
  orders: number[] | null | string;
}

export interface ISubagent {
  id?: number;
  name: string | null;
  payers: string[] | null | string;
  orders: number[] | null | string;
}