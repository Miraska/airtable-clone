export interface IData {
  id: number;
}

export interface ICol {
  key: string;
  label: string;
}

export interface IOrder extends IData {
  autonumber: number | null; // Автономер (по порядку)
  status: string; // Статус (закрыта; открыта; в работе и т. д.)
  order_number: number; // Номер (№) заявки
  managers: number[] | []; // Менеджеры (может хранится много менеджеров которые в другой таблице)
  reviewers: number[] | []; // Проверяющие (может хранится много менеджеров которые в другой таблице)
  date: string; // Дата размещения (дата)
  date_hired: string | null; // Взята в работу (дата)
  contractors: number[] | []; // Контрагент (может хранится много контрагентов из таблицы контрагенты)
  agents: number[] | []; // Агент (может хранится много агентов из таблицы агенты)
  clients: number[] | []; // Клиент (может хранится много клиентов из таблицы клиенты)
  client_inn: string | null; // ИНН (от клиента из таблицы клиентов)
  name_agency: string; // Наименование экспортёра или импортёра
  swift_code: string; // SWIFT Код банка получателя или отправителя
  countries: number[] | []; // Страна (может хранится 1 страна из таблицы стран)
  calc_condition: string; // Условия расчета
  type_transaction: string; // Вид сделки
  number_receiving: number; // Номер поручения
  date_instruction: string; // Подписано поручение (дата)
  currency: string; // Валюта
  sum_order: number; // Сумма заявки
  vip_commission: number; // VIP комиссия
  hide_commision: number; // Скрытая комиссия
  commision_plus_percent: number; // Комиссия +% банка
  commision_plus_accredit: number; // Комиссия + аккредитив
  commision_plus_escrow: number; // Комиссия + эскроу
  money_rate: number; // Курс
  hide_money_rate: number; // Скрытый курс
  date_fixation_rate: string; // Дата фиксации курса
  order_rate_rub: number; // Заявка по курсу в рублях
  agency_award: number; // Агентское вознаграждение
  real_award: number; // Фактическое вознаграждение
  not_ours_award: number; // Агентское не наше
  sum: number; // ИТОГО
  letter_of_credit: boolean; // С аккредитивом
  take_first_doc: boolean; // Получили первичные документы
  invoice: string; // Инвойс
  date_contract_signed: string; // Подписан агент. / субагент. договор
  date_reg_bank: string; // Поставлен на учет в банке
  date_open_letter_of_credit: string; // Открыт аккредитив
  date_valet_agency: string; // Оплачена валюта поставщику (импорт) / субагенту (экспорт)
  date_taking_agency: string; // Получена валюта поставщиком (импорт) / субагентом (экспорт)
  date_paid_rub: string; // Оплачен рубль клиенту (экспорт)
  date_unhide_letter_of_credit: string; // Аккредитив раскрыт
  date_sign_act: string; // Подписан акт-отчет
  date_close_deal: string; // Сделка закрыта
  cycle_deal: number; // Цикл сделки; дн
  purpose_of_payment: string; // Назначение платежа
  subagents: number[] | []; // Субагент (может хранится субагент из таблицы субагентов)
  subagentPayers: number[] | []; // Плательщик Субагента (может хранится плательщик субагента из таблицы плательщик субагентов)
  serial_num_for_payer: number; // Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)
  date_docs_agent_and_subagent: string; // Подготовлены документы между агентом и субагентом (дата)
  date_taking_swift: string; // Получен SWIFT
  date_get_swift103: string; // Получили SWIFT 103
  date_take_swift103: string; // Запросили SWIFT 103
  date_get_swift199: string; // Получили SWIFT 199
  date_take_swift199: string; // Запросили SWIFT 199
  date_refund: string; // Возврат запрошен
  date_take_refund: string; // Деньги по возврату получены
  status_swift: string; // Статус SWIFT
  stuck_money: boolean; // Зависли деньги
  stage_problem: string; // Стадии проблемы
  comment_problem: string; // Комментарии к заявкам по которым зависли деньги
  stuck_money_name: string; // Какая валюта зависла?
  stuck_money_sum: number; // Сумма зависла
  mistake_is_it_name: string; // Чья ошибка?
  order_link: string; // Заявка ссылка
  invoice_link: string; // Инвойс ссылка
  assignment_link: string; // Поручение ссылка
  swift_link: string; // SWIFT ссылка
  swift103_link: string; // SWIFT 103 ссылка
  swift199_link: string; // SWIFT 199 ссылка
  act_link: string; // Акт-отчет ссылка
  money_gone: boolean; // Сели деньги
}

export interface IAgent extends IData {
  name: string | null;
  order: number[] | null | string;
}

export interface IClient extends IData {
  name: string | null;
  inn: number | null | string;
  order: number[] | null | string;
}

export interface IContragent extends IData {
  name: string | null;
  order: number[] | null | string;
}

export interface ICountry extends IData {
  name: string | null;
  code: number | null | string;
  full_name: string | null;
  order: number[] | null | string;
}

export interface IManager extends IData {
  name: string | null;
  tel: string | null;
  date: string | null;
  order: number[] | null | string;
  review_table: number[] | null | string;
}

export interface ISubagentPayer extends IData {
  name: string | null;
  subagent: string[] | null | string;
  order: number[] | null | string;
}

export interface ISubagent extends IData {
  name: string | null;
  subagent_payer: string[] | null | string;
  order: number[] | null | string;
}
