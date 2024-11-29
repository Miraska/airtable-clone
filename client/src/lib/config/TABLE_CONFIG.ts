const TABLE_CONFIG = {
  order: {
    cols: [
      { field: "id", headerName: "ID", filter: true },
      { field: "status", headerName: "Статус", filter: true },
      { field: "order_number", headerName: "№ заявки", filter: true },
      { field: "manager", headerName: "Менеджеры", filter: true },
      { field: "reviewer", headerName: "Проверяющий", filter: true },
      { field: "date", headerName: "Дата размещения", filter: true },
      { field: "date_hired", headerName: "Взята в работу", filter: true },
      { field: "contragent", headerName: "Контрагент", filter: true },
      { field: "agent", headerName: "Агент", filter: true },
      { field: "client", headerName: "Клиент", filter: true },
      { field: "client_inn", headerName: "ИНН (from Клиент)", filter: true },
      { field: "name_agency", headerName: "Наименование Экспортера (при импорте) / Импортера (при экспорте)", filter: true },
      { field: "swift_code", headerName: "SWIFT код банка получателя (при импорте) / отправителя (при экспорте)", filter: true },
      { field: "country", headerName: "Страна", filter: true },
      { field: "calc_condition", headerName: "Условия расчета", filter: true },
      { field: "type_transaction", headerName: "Вид сделки", filter: true },
      { field: "number_receiving", headerName: "Номер поручения", filter: true },
      { field: "date_instruction", headerName: "Подписано поручение (для Совкомбанка)", filter: true },
      { field: "currency", headerName: "Валюта", filter: true },
      { field: "sum_order", headerName: "Сумма заявки", filter: true },
      { field: "vip_condition", headerName: "Условия VIP", filter: true },
      { field: "vip_commission", headerName: "Комиссия VIP", filter: true },
      { field: "hide_commision", headerName: "Скрытая комиссия", filter: true },
      { field: "commision_plus_percent", headerName: "Комиссия +% банка", filter: true },
      { field: "commision_plus_accredit", headerName: "Комиссия + аккред", filter: true },
      { field: "commision_plus_escrow", headerName: "Комиссия + эскроу", filter: true },
      { field: "money_rate", headerName: "Курс", filter: true },
      { field: "hide_money_rate", headerName: "Скрытый курс", filter: true },
      { field: "date_fixation_rate", headerName: "Дата фиксации курса", filter: true },
      { field: "order_rate_rub", headerName: "Заявка по курсу в рублях", filter: true },
      { field: "agency_award", headerName: "Агентское вознаграждение", filter: true },
      { field: "real_award", headerName: "Фактическое вознаграждение", filter: true },
      { field: "not_ours_award", headerName: "Агентское не наше", filter: true },
      { field: "sum", headerName: "ИТОГО", filter: true },
      { field: "letter_of_credit", headerName: "С аккредитивом", filter: true },
      { field: "take_first_doc", headerName: "Получили первичные документы", filter: true },
      { field: "invoice", headerName: "выставлен инвойс на поставщика (импорт) / на отправителя (экспорт)", filter: true },
      { field: "date_contract_signed", headerName: "подписан агент. / субагент. договор", filter: true },
      { field: "date_reg_bank", headerName: "поставлен на учет в банке", filter: true },
      { field: "date_open_letter_of_credit", headerName: "Открыт аккредитив", filter: true },
      { field: "date_valet_agency", headerName: "оплачена валюта поставщику (импорт) / субагенту (экспорт)", filter: true },
      { field: "date_taking_agency", headerName: "получена валюта поставщиком (импорт) / субагентом (экспорт)", filter: true },
      { field: "date_paid_rub", headerName: "оплачен рубль клиенту (экспорт)", filter: true },
      { field: "date_unhide_letter_of_credit", headerName: "аккредитив раскрыт", filter: true },
      { field: "date_sign_act", headerName: "подписан акт-отчет", filter: true },
      { field: "date_close_deal", headerName: "сделка закрыта", filter: true },
      { field: "cycle_deal", headerName: "Цикл сделки, дн", filter: true },
      { field: "purpose_of_payment", headerName: "Назначение платежа", filter: true },
      { field: "subagent", headerName: "Субагент", filter: true },
      { field: "subagents_payer", headerName: "Плательщик Субагента", filter: true },
      { field: "serial_num_for_payer", headerName: "Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)", filter: true },
      { field: "date_docs_agent_and_subagent", headerName: "Подготовлены документы между агентом и субагентом (дата)", filter: true },
      { field: "date_taking_swift", headerName: "Получен SWIFT", filter: true },
      { field: "date_get_swift103", headerName: "Запросили SWIFT 103", filter: true },
      { field: "date_take_swift103", headerName: "Получили SWIFT 103", filter: true },
      { field: "date_get_swift199", headerName: "Запросили SWIFT 199", filter: true },
      { field: "date_take_swift199", headerName: "Получили SWIFT 199", filter: true },
      { field: "date_refund", headerName: "Возврат запрошен", filter: true },
      { field: "date_take_refund", headerName: "Деньги по возврату получены", filter: true },
      { field: "status_swift", headerName: "Статус SWIFT", filter: true },
      { field: "stuck_money", headerName: "Зависли деньги", filter: true },
      { field: "stage_problem", headerName: "Стадии проблемы", filter: true },
      { field: "comment_problem", headerName: "комментарии к заявкам по которым зависли деньги", filter: true },
      { field: "stuck_money_name", headerName: "Какая валюта зависла?", filter: true },
      { field: "stuck_money_sum", headerName: "Сумма зависла", filter: true },
      { field: "mistake_is_it_name", headerName: "Чья ошибка?", filter: true },
      { field: "order_link", headerName: "Заявка", filter: true },
      { field: "invoice_link", headerName: "Инвойс", filter: true },
      { field: "assignment_link", headerName: "Поручение", filter: true },
      { field: "swift_link", headerName: "SWIFT", filter: true },
      { field: "swift103_link", headerName: "SWIFT 103", filter: true },
      { field: "swift199_link", headerName: "SWIFT 199", filter: true },
      { field: "act_link", headerName: "Акт-отчет", filter: true },
      { field: "money_gone", headerName: "Сели деньги", filter: true },
    ],
    relates: {
      field: ["manager", "reviewer", "contragent", "agent", "client", "country", "subagent", "subagents_payer"],
      relatedTable: ["manager", "manager", "contragent", "agent", "client", "country", "subagent", "subagents_payer"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Заявок
  },
  agent: {
    cols: [
      { field: "id", headerName: "ID", filter: true },
      { field: "name", headerName: "Наименования", filter: true },
      { field: "order", headerName: "Заявки", filter: true }
    ],
    relates: {
      field: ["order"],
      relatedTable: ["order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Агентов
  },
  client: {
    cols: [
      { field: "id" , headerName: "ID", filter: true },
      { field: "name", headerName: "Наименование", filter: true },
      { field: "inn", headerName: "ИНН", filter: true },
      { field: "order", headerName: "Заявки", filter: true }
    ],
    relates: {
      field: ["order"],
      relatedTable: ["order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Клиентов
  },
  contragent: {
    cols: [
      { field: "id", headerName:"ID", filter: true },
      { field: "name", headerName:"Наименование", filter: true },
      { field: "order", headerName:"Заявки", filter: true }
    ],
    relates: {
      field: ["order"],
      relatedTable: ["order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Контрагентов
  },
  country: {
    cols: [
      { field: "id", headerName:"ID", filter: true },
      { field: "name", headerName:"Краткое название", filter: true },
      { field: "code", headerName:"Код", filter: true },
      { field: "full_name", headerName:"Полное наименование", filter: true },
      { field: "order", headerName:"Заявки", filter: true }
    ],
    relates: {
      field: ["order"],
      relatedTable: ["order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Стран
  },
  manager: {
    cols: [
      { field: "id", headerName:"ID", filter: true },
      { field: "name", headerName:"Имя", filter: true },
      { field: "tel", headerName:"Телефон", filter: true },
      { field: "date", headerName:"Дата рождения", filter: true },
      { field: "order", headerName:"Заявки", filter: true },
      { field: "review", headerName:"Проверяю", filter: true }
    ],
    relates: {
      field: ["orders", "review"],
      relatedTable: ["order", "order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Менеджеров
  },
  subagent_payer: {
    cols: [
      { field: "id", headerName:"ID", filter: true },
      { field: "name", headerName:"Наименования", filter: true },
      { field: "subagent", headerName:"Субагенты", filter: true },
      { field: "order", headerName:"Заявки", filter: true }
    ],
    relates: {
      field: ["subagent","order"],
      relatedTable: ["subagent", "order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Плательщиков Субагентов
  },
  subagent: {
    cols: [
      { field: "id", headerName:"ID" },
      { field: "name", headerName:"Наименования" },
      { field: "subagent_payer", headerName:"Плательщик Субагента" },
      { field: "order", headerName:"Заявки" }
    ],
    relates: {
      field: ["subagent_payer","order"],
      relatedTable: ["subagent_payer", "order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Субагентов
  }
}

export default TABLE_CONFIG