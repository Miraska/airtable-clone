const TABLE_CONFIG = {
  order: {
    cols: [
      { field: "id", label: "ID" },
      { field: "status", label: "Статус" },
      { field: "order_number", label: "№ заявки" },
      { field: "manager", label: "Менеджеры" },
      { field: "reviewer", label: "Проверяющий" },
      { field: "date", label: "Дата размещения" },
      { field: "date_hired", label: "Взята в работу" },
      { field: "contragent", label: "Контрагент" },
      { field: "agent", label: "Агент" },
      { field: "client", label: "Клиент" },
      { field: "client_inn", label: "ИНН (from Клиент)" },
      { field: "name_agency", label: "Наименование Экспортера (при импорте) / Импортера (при экспорте)" },
      { field: "swift_code", label: "SWIFT код банка получателя (при импорте) / отправителя (при экспорте)" },
      { field: "country", label: "Страна" },
      { field: "calc_condition", label: "Условия расчета" },
      { field: "type_transaction", label: "Вид сделки" },
      { field: "number_receiving", label: "Номер поручения" },
      { field: "date_instruction", label: "Подписано поручение (для Совкомбанка)" },
      { field: "currency", label: "Валюта" },
      { field: "sum_order", label: "Сумма заявки" },
      { field: "vip_condition", label: "Условия VIP" },
      { field: "vip_commission", label: "Комиссия VIP" },
      { field: "hide_commision", label: "Скрытая комиссия" },
      { field: "commision_plus_percent", label: "Комиссия +% банка" },
      { field: "commision_plus_accredit", label: "Комиссия + аккред" },
      { field: "commision_plus_escrow", label: "Комиссия + эскроу" },
      { field: "money_rate", label: "Курс" },
      { field: "hide_money_rate", label: "Скрытый курс" },
      { field: "date_fixation_rate", label: "Дата фиксации курса" },
      { field: "order_rate_rub", label: "Заявка по курсу в рублях" },
      { field: "agency_award", label: "Агентское вознаграждение" },
      { field: "real_award", label: "Фактическое вознаграждение" },
      { field: "not_ours_award", label: "Агентское не наше" },
      { field: "sum", label: "ИТОГО" },
      { field: "letter_of_credit", label: "С аккредитивом" },
      { field: "take_first_doc", label: "Получили первичные документы" },
      { field: "invoice", label: "выставлен инвойс на поставщика (импорт) / на отправителя (экспорт)" },
      { field: "date_contract_signed", label: "подписан агент. / субагент. договор" },
      { field: "date_reg_bank", label: "поставлен на учет в банке" },
      { field: "date_open_letter_of_credit", label: "Открыт аккредитив" },
      { field: "date_valet_agency", label: "оплачена валюта поставщику (импорт) / субагенту (экспорт)" },
      { field: "date_taking_agency", label: "получена валюта поставщиком (импорт) / субагентом (экспорт)" },
      { field: "date_paid_rub", label: "оплачен рубль клиенту (экспорт)" },
      { field: "date_unhide_letter_of_credit", label: "аккредитив раскрыт" },
      { field: "date_sign_act", label: "подписан акт-отчет" },
      { field: "date_close_deal", label: "сделка закрыта" },
      { field: "cycle_deal", label: "Цикл сделки, дн" },
      { field: "purpose_of_payment", label: "Назначение платежа" },
      { field: "subagent", label: "Субагент" },
      { field: "subagents_payer", label: "Плательщик Субагента" },
      { field: "serial_num_for_payer", label: "Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)" },
      { field: "date_docs_agent_and_subagent", label: "Подготовлены документы между агентом и субагентом (дата)" },
      { field: "date_taking_swift", label: "Получен SWIFT" },
      { field: "date_get_swift103", label: "Запросили SWIFT 103" },
      { field: "date_take_swift103", label: "Получили SWIFT 103" },
      { field: "date_get_swift199", label: "Запросили SWIFT 199" },
      { field: "date_take_swift199", label: "Получили SWIFT 199" },
      { field: "date_refund", label: "Возврат запрошен" },
      { field: "date_take_refund", label: "Деньги по возврату получены" },
      { field: "status_swift", label: "Статус SWIFT" },
      { field: "stuck_money", label: "Зависли деньги" },
      { field: "stage_problem", label: "Стадии проблемы" },
      { field: "comment_problem", label: "комментарии к заявкам по которым зависли деньги" },
      { field: "stuck_money_name", label: "Какая валюта зависла?" },
      { field: "stuck_money_sum", label: "Сумма зависла" },
      { field: "mistake_is_it_name", label: "Чья ошибка?" },
      { field: "order_link", label: "Заявка" },
      { field: "invoice_link", label: "Инвойс" },
      { field: "assignment_link", label: "Поручение" },
      { field: "swift_link", label: "SWIFT" },
      { field: "swift103_link", label: "SWIFT 103" },
      { field: "swift199_link", label: "SWIFT 199" },
      { field: "act_link", label: "Акт-отчет" },
      { field: "money_gone", label: "Сели деньги" },
    ],
    relates: {
      field: ["manager", "reviewer", "contragent", "agent", "client", "country", "subagent", "subagents_payer"],
      relatedTable: ["manager", "manager", "contragent", "agent", "client", "country", "subagent", "subagents_payer"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Заявок
  },
  agent: {
    cols: [
      { field: "id", label: "ID" },
      { field: "name", label: "Наименования" },
      { field: "order", label: "Заявки" }
    ],
    relates: {
      field: ["order"],
      relatedTable: ["order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Агентов
  },
  client: {
    cols: [
      { field: "id" , label: "ID" },
      { field: "name", label: "Наименование" },
      { field: "inn", label: "ИНН" },
      { field: "order", label: "Заявки" }
    ],
    relates: {
      field: ["order"],
      relatedTable: ["order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Клиентов
  },
  contragent: {
    cols: [
      { field: "id", label:"ID" },
      { field: "name", label:"Наименование" },
      { field: "order", label:"Заявки" }
    ],
    relates: {
      field: ["order"],
      relatedTable: ["order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Контрагентов
  },
  country: {
    cols: [
      { field: "id", label:"ID" },
      { field: "name", label:"Краткое название" },
      { field: "code", label:"Код" },
      { field: "full_name", label:"Полное наименование" },
      { field: "order", label:"Заявки" }
    ],
    relates: {
      field: ["order"],
      relatedTable: ["order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Стран
  },
  manager: {
    cols: [
      { field: "id", label:"ID" },
      { field: "name", label:"Имя" },
      { field: "tel", label:"Телефон" },
      { field: "date", label:"Дата рождения" },
      { field: "order", label:"Заявки" },
      { field: "review", label:"Проверяю" }
    ],
    relates: {
      field: ["orders", "review"],
      relatedTable: ["order", "order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Менеджеров
  },
  subagent_payer: {
    cols: [
      { field: "id", label:"ID" },
      { field: "name", label:"Наименования" },
      { field: "subagent", label:"Субагенты" },
      { field: "order", label:"Заявки" }
    ],
    relates: {
      field: ["subagent","order"],
      relatedTable: ["subagent", "order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Плательщиков Субагентов
  },
  subagent: {
    cols: [
      { field: "id", label:"ID" },
      { field: "name", label:"Наименования" },
      { field: "subagent_payer", label:"Плательщик Субагента" },
      { field: "order", label:"Заявки" }
    ],
    relates: {
      field: ["subagent_payer","order"],
      relatedTable: ["subagent_payer", "order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Субагентов
  }
}

export default TABLE_CONFIG