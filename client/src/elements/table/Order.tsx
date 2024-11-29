import { useEffect, useState } from "react"
import axios from "axios";
import Table from "./Table"

export default function OrderTable() {
  const [orderData, setOrderData] = useState([]); // Состояние для хранения данных
  const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние для ошибки
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://55b4-89-110-76-58.ngrok-free.app/api/orders", {
          headers: {
            'ngrok-skip-browser-warning': '1'
          }
        });
        setOrderData(response.data)
        setLoading(false); // Снимаем индикатор загрузки
      } catch (err) {
        setError("Failed to load data."); // Устанавливаем сообщение об ошибке
        setLoading(false);
      }
    };
    fetchUsers();
  })
  
  const OrderTable = {
    name: "Заявки",
    cols: [
      { key: "id", label: "ID" },
      { key: "status", label: "Статус" },
      { key: "order_number", label: "№ заявки" },
      { key: "manager", label: "Менеджеры" },
      { key: "reviewer", label: "Проверяющий" },
      { key: "date", label: "Дата размещения" },
      { key: "date_hired", label: "Взята в работу" },
      { key: "contragent", label: "Контрагент" },
      { key: "agent", label: "Агент" },
      { key: "client", label: "Клиент" },
      { key: "client_inn", label: "ИНН (from Клиент)" },
      { key: "name_agency", label: "Наименование Экспортера (при импорте) / Импортера (при экспорте)" },
      { key: "swift_code", label: "SWIFT код банка получателя (при импорте) / отправителя (при экспорте)" },
      { key: "country", label: "Страна" },
      { key: "calc_condition", label: "Условия расчета" },
      { key: "type_transaction", label: "Вид сделки" },
      { key: "number_receiving", label: "Номер поручения" },
      { key: "date_instruction", label: "Подписано поручение (для Совкомбанка)" },
      { key: "currency", label: "Валюта" },
      { key: "sum_order", label: "Сумма заявки" },
      { key: "vip_condition", label: "Условия VIP" },
      { key: "vip_commission", label: "Комиссия VIP" },
      { key: "hide_commision", label: "Скрытая комиссия" },
      { key: "commision_plus_percent", label: "Комиссия +% банка" },
      { key: "commision_plus_accredit", label: "Комиссия + аккред" },
      { key: "commision_plus_escrow", label: "Комиссия + эскроу" },
      { key: "money_rate", label: "Курс" },
      { key: "hide_money_rate", label: "Скрытый курс" },
      { key: "date_fixation_rate", label: "Дата фиксации курса" },
      { key: "order_rate_rub", label: "Заявка по курсу в рублях" },
      { key: "agency_award", label: "Агентское вознаграждение" },
      { key: "real_award", label: "Фактическое вознаграждение" },
      { key: "not_ours_award", label: "Агентское не наше" },
      { key: "sum", label: "ИТОГО" },
      { key: "letter_of_credit", label: "С аккредитивом" },
      { key: "take_first_doc", label: "Получили первичные документы" },
      { key: "invoice", label: "выставлен инвойс на поставщика (импорт) / на отправителя (экспорт)" },
      { key: "date_contract_signed", label: "подписан агент. / субагент. договор" },
      { key: "date_reg_bank", label: "поставлен на учет в банке" },
      { key: "date_open_letter_of_credit", label: "Открыт аккредитив" },
      { key: "date_valet_agency", label: "оплачена валюта поставщику (импорт) / субагенту (экспорт)" },
      { key: "date_taking_agency", label: "получена валюта поставщиком (импорт) / субагентом (экспорт)" },
      { key: "date_paid_rub", label: "оплачен рубль клиенту (экспорт)" },
      { key: "date_unhide_letter_of_credit", label: "аккредитив раскрыт" },
      { key: "date_sign_act", label: "подписан акт-отчет" },
      { key: "date_close_deal", label: "сделка закрыта" },
      { key: "cycle_deal", label: "Цикл сделки, дн" },
      { key: "purpose_of_payment", label: "Назначение платежа" },
      { key: "subagent", label: "Субагент" },
      { key: "subagents_payer", label: "Плательщик Субагента" },
      { key: "serial_num_for_payer", label: "Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)" },
      { key: "date_docs_agent_and_subagent", label: "Подготовлены документы между агентом и субагентом (дата)" },
      { key: "date_taking_swift", label: "Получен SWIFT" },
      { key: "date_get_swift103", label: "Запросили SWIFT 103" },
      { key: "date_take_swift103", label: "Получили SWIFT 103" },
      { key: "date_get_swift199", label: "Запросили SWIFT 199" },
      { key: "date_take_swift199", label: "Получили SWIFT 199" },
      { key: "date_refund", label: "Возврат запрошен" },
      { key: "date_take_refund", label: "Деньги по возврату получены" },
      { key: "status_swift", label: "Статус SWIFT" },
      { key: "stuck_money", label: "Зависли деньги" },
      { key: "stage_problem", label: "Стадии проблемы" },
      { key: "comment_problem", label: "комментарии к заявкам по которым зависли деньги" },
      { key: "stuck_money_name", label: "Какая валюта зависла?" },
      { key: "stuck_money_sum", label: "Сумма зависла" },
      { key: "mistake_is_it_name", label: "Чья ошибка?" },
      { key: "order_link", label: "Заявка" },
      { key: "invoice_link", label: "Инвойс" },
      { key: "assignment_link", label: "Поручение" },
      { key: "swift_link", label: "SWIFT" },
      { key: "swift103_link", label: "SWIFT 103" },
      { key: "swift199_link", label: "SWIFT 199" },
      { key: "act_link", label: "Акт-отчет" },
      { key: "money_gone", label: "Сели деньги" },
    ]
  }
  
  if (loading) {
    return <p>Loading...</p>; // Индикатор загрузки
  }
  
  if (error) {
    return <p>Error: {error}</p>; // Отображение ошибки
  }
  
  return (
    <>
      <Table tableName={ OrderTable.name } columns={OrderTable.cols} data={orderData}/>
    </>
  )
}