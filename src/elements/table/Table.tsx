import { Card, Chip } from "@material-tailwind/react";
import axios from "axios";
import { useQuery } from "react-query";
import IOrder from "../../interface/IOrder/IOrder";
import useManagerStore from "../../hooks/useManagerStore/useManagerStore";

export default function Table() {
  const getQueryData = async () => {
    const headers = {
      "ngrok-skip-browser-warning": "1"
    }
    const response = await axios.get('https://debb-89-110-76-58.ngrok-free.app/api/requests', {headers})
    return response.data
  }
  
  const isManagerOpen = useManagerStore((state) => state.isOpen)
  
  const result = useQuery("todos", getQueryData)
  
  if (result.isLoading) console.log("Загрузка")
  if (result.isError) console.log("Ошибка")
  if (result.isSuccess) console.log(result.data.map((head: IOrder) => {console.log(head.autonumber)}))
  
  return(
    <Card className="w-full h-full overflow-scroll border text-gray-900 dark:text-white dark:bg-gray-900 dark:border-gray-800">
      <table className={`min-w-max w-full table-auto border-collapse text-left ${ isManagerOpen ? "hidden" : ""}`}>
        <thead>
          <tr>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Автономер</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Статус</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">№ заявки</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Менеджер</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Проверяющий</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Дата размещения</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Взята в работу</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Контрагент</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Агент</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Клиент</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">ИНН (from Клиент)</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Наименование Экспортера (при импорте) / Импортера (при экспорте)</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">SWIFT код банка получателя (при импорте) / отправителя (при экспорте)</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Страна</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Условия расчета</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Вид сделки</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Номер поручения</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Подписано поручение (для Совкомбанка)</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Валюта</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Сумма заявки</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Условия VIP</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Комиссия VIP</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Скрытая комиссия</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Комиссия +% банка</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Комиссия + аккред</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Комиссия + эскроу</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Курс</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Скрытый курс</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Дата фиксации курса</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Заявка по курсу в рублях</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Агентское вознаграждение</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Фактическое вознаграждение</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Агентское не наше</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">ИТОГО</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">С аккредитивом</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Получили первичные документы</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">выставлен инвойс на поставщика (импорт) / на отправителя (экспорт)</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">подписан агент. / субагент. договор</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">поставлен на учет в банке</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Открыт аккредитив</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">оплачена валюта поставщику (импорт) / субагенту (экспорт)</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">получена валюта поставщиком (импорт) / субагентом (экспорт)</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">оплачен рубль клиенту (экспорт)</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">аккредитив раскрыт</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">подписан акт-отчет</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">сделка закрыта</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Цикл сделки, дн</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Назначение платежа</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Субагент</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Плательщик Субагента 2</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Подготовлены документы между агентом и субагентом (дата)</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Получен SWIFT</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Запросили SWIFT 103</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Запросили SWIFT 199</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Статус SWIFT</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Зависли деньги</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">комментарии к заявкам по которым зависли деньги</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Поступило на наш расчетный счет</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Agentskoe voznagrazhdenie</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Ostatok k oplate</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Bank</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Oshibki po zayavke</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Postupilo na nash raschetnyj schet data</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Agentskoe voznagrazhdenie date</th>
            <th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Плательщик субагента</th>
            <th className="border-b p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">В разработке</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-[#fafafa] dark:hover:bg-[#1e293b]">
            <td className="p-4 border-r border-b dark:border-gray-800">1</td>
            <td className="p-4 border-r border-b dark:border-gray-800">
              <Chip value="Заявка закрыта" variant="ghost" size="sm" color="green"/>
            </td>
            <td className="p-4 border-r border-b dark:border-gray-800">109087</td>
          </tr>
          <tr className="hover:bg-[#fafafa] dark:hover:bg-[#1e293b]">
            <td className="p-4 border-r border-b dark:border-gray-800">2</td>
            <td className="p-4 border-r border-b dark:border-gray-800">
              <Chip value="Заявка закрыта" variant="ghost" size="sm" color="green"/>
            </td>
            <td className="p-4 border-r border-b dark:border-gray-800">109090</td>
          </tr>
          <tr className="hover:bg-[#fafafa] dark:hover:bg-[#1e293b]">
            <td className="p-4 border-r border-b dark:border-gray-800">3</td>
            <td className="p-4 border-r border-b dark:border-gray-800">
              <Chip value="Заявка не закрыта" variant="ghost" size="sm" color="red"/>
            </td>
            <td className="p-4 border-r border-b dark:border-gray-800">108974</td>
          </tr>
        </tbody>
      </table>
      <table className={`min-w-max w-full table-auto border-collapse text-left ${ isManagerOpen ? "" : "hidden"}`}>
        <thead>
          <tr>
            <th className="border-b p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Имя</th>
            <th className="border-b p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Номер</th>
            <th className="border-b p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">№ заявки</th>
          </tr>
        </thead>
        <tbody>
          <tr className="dark:hover:bg-[#1e293b]">
            <td className="p-4 border-b dark:border-gray-800">Марат</td>
            <td className="p-4 border-b dark:border-gray-800">
              <Chip value="+7 987 654 32 10" variant="ghost" size="sm" color="green"/>
            </td>
            <td className="p-4 border-b dark:border-gray-800">109087</td>
          </tr>
          <tr className="dark:hover:bg-[#1e293b]">
            <td className="p-4 border-b dark:border-gray-800">Камиль</td>
            <td className="p-4 border-b dark:border-gray-800">
              <Chip value="+7 987 654 32 10" variant="ghost" size="sm" color="green"/>
            </td>
            <td className="p-4 border-b dark:border-gray-800">109087</td>
          </tr>
          <tr className="dark:hover:bg-[#1e293b]">
            <td className="p-4 border-b dark:border-gray-800">Тамара</td>
            <td className="p-4 border-b dark:border-gray-800">
              <Chip value="+7 987 654 32 10" variant="ghost" size="sm" color="green"/>
            </td>
            <td className="p-4 border-b dark:border-gray-800">109087</td>
          </tr>
        </tbody>
      </table>
    </Card>
  )
}
