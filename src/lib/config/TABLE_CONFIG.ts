const TABLE_CONFIG = {
  order: {
    columns: [
      {
        id: 0,
        status: "Статус",
        order_number: "№ заявки",
        manager: "Менеджеры",
        reviewer: "Проверяющий",
        date: "Дата размещения",
        date_hired: "Взята в работу",
        contragent: "Контрагент",
        agent: "Агент",
        client: "Клиент",
        client_inn: "ИНН (from Клиент)",
        name_agency: "Наименование Экспортера (при импорте) / Импортера (при экспорте)",
        swift_code: "SWIFT код банка получателя (при импорте) / отправителя (при экспорте)",
        country: "Страна",
        calc_condition: "Условия расчета",
        type_transaction: "Вид сделки",
        number_receiving: "Номер поручения",
        date_instruction: "Подписано поручение (для Совкомбанка)",
        currency: "Валюта",
        sum_order: "Сумма заявки",
        vip_condition: "Условия VIP",
        vip_commission: "Комиссия VIP",
        hide_commision: "Скрытая комиссия",
        commision_plus_percent: "Комиссия +% банка",
        commision_plus_accredit: "Комиссия + аккред",
        commision_plus_escrow: "Комиссия + эскроу",
        money_rate: "Курс",
        hide_money_rate: "Скрытый курс",
        date_fixation_rate: "Дата фиксации курса",
        order_rate_rub: "Заявка по курсу в рублях",
        agency_award: "Агентское вознаграждение",
        real_award: "Фактическое вознаграждение",
        not_ours_award: "Агентское не наше",
        sum: "ИТОГО",
        letter_of_credit: "С аккредитивом",
        take_first_doc: "Получили первичные документы",
        invoice: "выставлен инвойс на поставщика (импорт) / на отправителя (экспорт)",
        date_contract_signed: "подписан агент. / субагент. договор",
        date_reg_bank: "поставлен на учет в банке",
        date_open_letter_of_credit: "Открыт аккредитив",
        date_valet_agency: "оплачена валюта поставщику (импорт) / субагенту (экспорт)",
        date_taking_agency: "получена валюта поставщиком (импорт) / субагентом (экспорт)",
        date_paid_rub: "оплачен рубль клиенту (экспорт)",
        date_unhide_letter_of_credit: "аккредитив раскрыт",
        date_sign_act: "подписан акт-отчет",
        date_close_deal: "сделка закрыта",
        cycle_deal: "Цикл сделки, дн",
        purpose_of_payment: "Назначение платежа",
        subagent: "Субагент",
        subagents_payer: "Плательщик Субагента",
        serial_num_for_payer: "Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)",
        date_docs_agent_and_subagent: "Подготовлены документы между агентом и субагентом (дата)",
        date_taking_swift: "Получен SWIFT",
        date_get_swift103: "Запросили SWIFT 103",
        date_take_swift103: "Получили SWIFT 103",
        date_get_swift199: "Запросили SWIFT 199",
        date_take_swift199: "Получили SWIFT 199",
        date_refund: "Возврат запрошен",
        date_take_refund: "Деньги по возврату получены",
        status_swift: "Статус SWIFT",
        stuck_money: "Зависли деньги",
        stage_problem: "Стадии проблемы",
        comment_problem: "комментарии к заявкам по которым зависли деньги",
        stuck_money_name: "Какая валюта зависла?",
        stuck_money_sum: "Сумма зависла",
        mistake_is_it_name: "Чья ошибка?",
        order_link: "Заявка",
        invoice_link: "Инвойс",
        assignment_link: "Поручение",
        swift_link: "SWIFT",
        swift103_link: "SWIFT 103",
        swift199_link: "SWIFT 199",
        act_link: "Акт-отчет",
        money_gone: "Сели деньги",
      }
    ],
    relates: {
      field: ["manager", "reviewer", "contragent", "agent", "client", "country", "subagent", "subagents_payer"],
      relatedTable: ["manager", "manager", "contragent", "agent", "client", "country", "subagent", "subagents_payer"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Заявок
  },
  agent: {
    columns: [
      {
        id: 0,
        name: "Наименования",
        orders: "Заявки"
      }
    ],
    relates: {
      field: ["orders"],
      relatedTable: ["order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Агентов
  },
  client: {
    columns: [
      {
        id: 0,
        name: "Наименование",
        inn: "ИНН",
        orders: "Заявки"
      }
    ],
    relates: {
      field: ["orders"],
      relatedTable: ["order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Клиентов
  },
  contragent: {
    columns: [
      {
        id: 0,
        name: "Наименование",
        orders: "Заявки"
      }
    ],
    relates: {
      field: ["orders"],
      relatedTable: ["order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Контрагентов
  },
  country: {
    columns: [
      {
        id: 0,
        name: "Краткое название",
        code: "Код",
        full_name: "Полное наименование",
        orders: "Заявки"
      }
    ],
    relates: {
      field: ["orders"],
      relatedTable: ["order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Стран
  },
  manager: {
    columns: [
      { 
        id: 0, 
        name: "Имя", 
        tel: "Телефон",
        date: "Дата рождения",
        orders: "Заявки",
        reviews: "Проверяю"
      }
    ],
    relates: {
      field: ["orders", "reviews"],
      relatedTable: ["order", "order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Менеджеров
  },
  subagent_payer: {
    columns: [
      {
        id: 0,
        name: "Наименования",
        subagents: "Субагенты",
        orders: "Заявки"
      }
    ],
    relates: {
      field: ["subagents","orders"],
      relatedTable: ["subagent", "order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Плательщиков Субагентов
  },
  subagent: {
    columns: [
      {
        id: 0,
        name: "Наименования",
        subagent_payers: "Плательщик Субагента",
        orders: "Заявки"
      }
    ],
    relates: {
      field: ["subagent_payers","orders"],
      relatedTable: ["subagent_payer", "order"]
    },
    endpoint: "https://api.example.com/api/managers" // Эндпоинт Субагентов
  }
}

export default TABLE_CONFIG