const columns = [
  { key: "id", label: "ID", sortable: true, type: "number", readonly: true },
  { key: "autonumber", label: "Автономер", sortable: true, type: "number" },
  { key: "status", label: "Статус", sortable: true, type: "option" },
  { key: "order_number", label: "№ заявки", sortable: true, type: "text" },
  { key: "managers", label: "Менеджеры", sortable: false, type: "related" },
  { key: "reviewers", label: "Проверяющие", sortable: false, type: "reviewers" },
  { key: "date", label: "Дата размещения", sortable: true, type: "date" },
  { key: "date_hired", label: "Взята в работу", sortable: true, type: "date" },
  { key: "contractors", label: "Контрагент", sortable: false, type: "related" },
  { key: "agents", label: "Агенты", sortable: false, type: "related" },
  { key: "clients", label: "Клиенты", sortable: false, type: "related" },
  { key: "client_inn", label: "ИНН клиента", sortable: true, type: "text", readonly: true },
  { key: "name_agency", label: "Наименование экспортёра/импортёра", sortable: true, type: "text" },
  { key: "swift_code", label: "SWIFT код банка получателя (при импорте) / отправителя (при экспорте)", sortable: true, type: "text" },
  { key: "countries", label: "Страна", sortable: true, type: "related" },
  { key: "calc_condition", label: "Условия расчета", sortable: true, type: "condition" }, // Нужно добавить опции
  { key: "type_transaction", label: "Вид сделки", sortable: true, type: "transaction" }, // Нужно добавить опции
  { key: "number_receiving", label: "Номер поручения", sortable: true, type: "text" },
  { key: "date_instruction", label: "Подписано поручение (для Совкомбанка)", sortable: true, type: "date" },
  { key: "currency", label: "Валюта", sortable: true, type: "currency" },
  { key: "sum_order", label: "Сумма заявки", sortable: true, type: "number" },
  { key: "vip_condition", label: "Условия VIP", sortable: true, type: "text" },
  { key: "vip_commission", label: "VIP Комиссия", sortable: true, type: "number" },
  { key: "hide_commission", label: "Скрытая комиссия", sortable: true, type: "number" },
  { key: "commision_plus_percent", label: "Комиссия +% банка", sortable: true, type: "number" },
  { key: "commision_plus_accredit", label: "Комиссия + Аккредитив", sortable: true, type: "number" },
  { key: "commision_plus_escrow", label: "Комиссия + Эскроу", sortable: true, type: "number" },
  { key: "money_rate", label: "Курс", sortable: true, type: "number" },
  { key: "hide_money_rate", label: "Скрытый курс", sortable: true, type: "number" },
  { key: "date_fixation_rate", label: "Дата фиксации курса", sortable: true, type: "date" },
  { key: "order_rate_rub", label: "Заявка по курсу в рублях", sortable: true, type: "text" },
  { key: "agency_award", label: "Агентское вознаграждение", sortable: true, type: "number" },
  { key: "real_award", label: "Фактическое вознаграждение", sortable: true, type: "number" },
  { key: "not_ours_award", label: "Агентское не наше", sortable: true, type: "number" },
  { key: "sum", label: "ИТОГО", sortable: true, type: "number" },
  { key: "letter_of_credit", label: "С аккредитивом", sortable: true, type: "boolean" },
  { key: "take_first_doc", label: "Получили первичные документы", sortable: true, type: "boolean" },
  { key: "invoice", label: "Выставлен инвойс на поставщика (импорт) / на отправителя (экспорт)", sortable: true, type: "date" },
  { key: "date_contract_signed", label: "Подписан агент. / субагент. договор", sortable: true, type: "date" },
  { key: "date_reg_bank", label: "Поставлен на учет в банке", sortable: true, type: "date" },
  { key: "date_open_letter_of_credit", label: "Открыт аккредитив", sortable: true, type: "date" },
  { key: "date_valet_agency", label: "Оплачена валюта поставщику (импорт) / субагенту (экспорт)", sortable: true, type: "date" },
  { key: "date_taking_agency", label: "Получена валюта поставщиком (импорт) / субагентом (экспорт)", sortable: true, type: "date" },
  { key: "date_paid_rub", label: "Оплачен рубль клиенту (экспорт)", sortable: true, type: "date" },
  { key: "date_unhide_letter_of_credit", label: "Аккредитив раскрыт", sortable: true, type: "date" },
  { key: "date_sign_act", label: "Подписан акт-отчет", sortable: true, type: "date" },
  { key: "date_close_deal", label: "Сделка закрыта", sortable: true, type: "date" },
  { key: "cycle_deal", label: "Цикл сделки (дни)", sortable: true, type: "number" },
  { key: "purpose_of_payment", label: "Назначение платежа", sortable: true, type: "text" },
  { key: "subagents", label: "Субагент", sortable: false, type: "related" },
  { key: "subagentPayers", label: "Плательщик субагента", sortable: false, type: "payers" },
  { key: "serial_num_for_payer", label: "Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)", sortable: true, type: "text" },
  { key: "date_docs_agent_and_subagent", label: "Подготовлены документы между агентом и субагентом (дата)", sortable: true, type: "date" },
  { key: "date_taking_swift", label: "Получен SWIFT", sortable: true, type: "date" },
  { key: "date_get_swift103", label: "Запросили SWIFT 103", sortable: true, type: "date" },
  { key: "date_take_swift103", label: "Получили SWIFT 103", sortable: true, type: "date" },
  { key: "date_get_swift199", label: "Запросили SWIFT 199", sortable: true, type: "date" },
  { key: "date_take_swift199", label: "Получили SWIFT 199", sortable: true, type: "date" },
  { key: "date_refund", label: "Возврат запрошен", sortable: true, type: "date" },
  { key: "date_take_refund", label: "Деньги по возврату получены", sortable: true, type: "date" },
  { key: "status_swift", label: "Статус SWIFT", sortable: true, type: "swift" },
  { key: "stuck_money", label: "Зависли деньги", sortable: true, type: "boolean" },
  { key: "stage_problem", label: "Стадии проблемы", sortable: true, type: "problem-stage" },
  { key: "comment_problem", label: "Комментарии к заявкам по которым зависли деньги", sortable: false, type: "text" },
  { key: "stuck_money_name", label: "Какая валюта зависла?", sortable: true, type: "currency" },
  { key: "stuck_money_sum", label: "Сумма зависла", sortable: true, type: "number" },
  { key: "mistake_is_it_name", label: "Чья ошибка?", sortable: true, type: "name-mistake" },
  { key: "order_link", label: "Ссылка на заявку", sortable: false, type: "text" },
  { key: "invoice_link", label: "Ссылка на инвойс", sortable: false, type: "text" },
  { key: "assignment_link", label: "Ссылка на поручение", sortable: false, type: "text" },
  { key: "swift_link", label: "Ссылка на SWIFT", sortable: false, type: "text" },
  { key: "swift103_link", label: "Ссылка на SWIFT 103", sortable: false, type: "text" },
  { key: "swift199_link", label: "Ссылка на SWIFT 199", sortable: false, type: "text" },
  { key: "act_link", label: "Ссылка на акт-отчет", sortable: false, type: "text" },
  { key: "money_gone", label: "Сели деньги", sortable: true, type: "boolean" },
];

export default columns;