import { ICol } from "../interface/interface";

export const agentCol: ICol[] = [
    { key: 'name', label: 'Наименование' },
    { key: 'order', label: 'Заявки' }
]

export const clientCol: ICol[] = [
    { key: 'name', label: 'Наименование' },
    { key: 'inn', label: 'ИНН' },
    { key: 'order', label: 'Заявки' }
];

export const contractorCol: ICol[] = [
    { key: 'name', label: 'Наименование' },
    { key: 'order', label: 'Заявки' }
];

export const countryCol: ICol[] = [
    { key: 'name', label: 'Краткое название' },
    { key: 'code', label: 'Код' },
    { key: 'full_name', label: 'Полное наименование' },
    { key: 'order', label: 'Заявки' }
];

export const managerCol: ICol[] = [
    { key: 'name', label: 'Имя' },
    { key: 'tel', label: 'Номер телефона' },
    { key: 'date', label: 'День рождения' },
    { key: 'order', label: 'Заявки' },
    { key: 'review', label: 'Проверяю' }
];

export const orderCol: ICol[] = [
    {key: "autonumber", label: "ID (Автономер)"},
    {key: "status", label: "Статус"},
    {key: "order_number", label: "№ заявки"},
    {key: "managers", label: "Менеджер"},
    {key: "reviewers", label: "Проверяющий"},
    {key: "date", label: "Дата размещения"},
    {key: "date_hired", label: "Взята в работу"},
    {key: "contractors", label: "Контрагент"},
    {key: "agents", label: "Агент"},
    {key: "clients", label: "Клиент"}, 
    {key: "client_inn", label: "ИНН (from Клиент)"},
    {key: "name_agency", label: "Наименование экспортёра или импортёра"},
    {key: "swift_code", label: "SWIFT код банка получателя (при импорте) / отправителя (при экспорте)"},
    {key: "country_id", label: "Страна"},
    {key: "calc_condition", label: "Условия расчета"},
    {key: "type_transaction", label: "Вид сделки"},
    {key: "number_receiving", label: "Номер поручения"},
    {key: "date_instruction", label: "Подписано поручение"},
    {key: "currency", label: "Валюта"},
    {key: "sum_order", label: "Сумма заявки"},
    {key: "vip_commission", label: "VIP Комиссия"},
    {key: "hide_commission", label: "Скрытая комиссия"},
    {key: "commision_plus_percent", label: "Комиссия +% банка"},
    {key: "commision_plus_accredit", label: "Комиссия + Аккредитив"},
    {key: "commision_plus_escrow", label: "Commission + Эксроу"},
    {key: "money_rate", label: "Курс"},
    {key: "hide_money_rate", label: "Скрытый курс"},
    {key: "date_fixation_rate", label: "Дата фиксация курса"},
    {key: "order_rate_rub", label: "Заявка по курсу в рублях"},
    {key: "agency_award", label: "Агентское вознаграждение"},
    {key: "real_award", label: "Фактическое вознаграждение"},
    {key: "not_ours_award", label: "Агентское не наше"},
    {key: "sum", label: "ИТОГО"},
    {key: "letter_of_credit", label: "С аккредитивом"},
    {key: "take_first_doc", label: "Получили первичные документы"},
    {key: "invoice", label: "Инвойс"},
    {key: "date_contract_signed", label: "Подписан агент. / субагент. договор"},
    {key: "date_reg_bank", label: "Поставлен на учет в банке"},
    {key: "date_open_letter_of_credit", label: "Открыт аккредитив"},
    {key: "date_valet_agency", label: "Оплачена валюта поставщику (импорт) / субагенту (экспорт)"},
    {key: "date_taking_agency", label: "Получена валюта поставщиком (импорт) / субагентом (экспорт)"},
    {key: "date_paid_rub", label: "Оплачен рубль клиенту (экспорт)"},
    {key: "date_unhide_letter_of_credit", label: "Аккредитив раскрыт"},
    {key: "date_sign_act", label: "Подписан акт-отчет"},
    {key: "date_close_deal", label: "Сделка закрыта"},
    {key: "cycle_deal", label: "Цикл сделки, дн"},
    {key: "purpose_of_payment", label: "Назначение платежа"},
    {key: "subagents", label: "Субагент"},
    {key: "subagentPayers", label: "Плательщик Субагента"},
    {
        key: "serial_num_for_payer",
        label: "Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)",
    },
    {key: "date_docs_agent_and_subagent", label: "Подготовлены документы между агентом и субагентом (дата)"},
    {key: "date_taking_swift", label: "Получен SWIFT"},
    {key: "date_get_swift103", label: "Запросили SWIFT 103"},
    {key: "date_take_swift103", label: "Получили SWIFT 103"},
    {key: "date_get_swift199", label: "Запросили SWIFT 199"},
    {key: "date_take_swift199", label: "Получили SWIFT 199"},
    {key: "date_refund", label: "Возврат запрошен"},
    {key: "date_take_refund", label: "Деньги по возврату получены"},
    {key: "status_swift", label: "Статус SWIFT"},
    {key: "stuck_money", label: "Зависли деньги"},
    {key: "stage_problem", label: "Стадии проблемы"},
    {key: "comment_problem", label: "Комментарии к заявкам по которым зависли деньги"},
    {key: "stuck_money_name", label: "Какая валюта зависла"},
    {key: "stuck_money_sum", label: "Сумма зависла"},
    {key: "mistake_is_it_name", label: "Чья ошибка?"},
    {key: "order_link", label: "Заявка"},
    {key: "invoice_link", label: "Инвойс"},
    {key: "assignment_link", label: "Поручение"},
    {key: "swift_link", label: "SWIFT"},
    {key: "swift103_link", label: "SWIFT 103"},
    {key: "swift199_link", label: "SWIFT 199"},
    {key: "act_link", label: "Акт-отчет"},
    {key: "money_gone", label: "Сели деньги"},
];

export const subagentPayerCol: ICol[] = [
    { key: 'name', label: 'Наименование' },
    { key: 'subagent', label: 'Cубагенты' },
    { key: 'order', label: 'Заявки' },
];

export const subagentCol: ICol[] = [
    { key: 'name', label: 'Наименование' },
    { key: 'subagent_payer', label: 'Плательщик Субагента' },
    { key: 'order', label: 'Заявки' },
];