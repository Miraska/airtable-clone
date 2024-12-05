import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "../api";
import { DataTable } from "../components/DataTable";
import { Modal } from "../components/Modal";
import { OrderForm } from "../components/OrderForm";
import { toast } from "react-toastify";
import type { IOrder } from "../types";

import columns from "../lib/tableColumnsData/columnsOrder";
import { FormProvider, useForm } from "react-hook-form";

export const OrdersPage = () => {
  const defaultValue = { // ЗАЯВКИ
    status: "", // Статус (закрыта, открыта, в работе и т. д.)
    order_number: 0, // Номер (№) заявки
    manager: [], // Менеджеры (может хранится много менеджеров которые в другой таблице)
    reviewer: [], // Проверяющие (может хранится много менеджеров которые в другой таблице)
    date: "", // Дата размещения (дата)
    date_hired: "", // Взята в работу (дата)
    contragent: "", // Контрагент (может хранится много контрагентов из таблицы контрагенты)
    agent: [], // Агент (может хранится много агентов из таблицы агенты)
    client: [], // Клиент (может хранится много клиентов из таблицы клиенты)
    client_inn: "", // ИНН (от клиента из таблицы клиентов)
    name_agency: "", // Наименование экспортёра или импортёра
    swift_code: "", // SWIFT Код банка получателя или отправителя
    country: [], // Страна (может хранится 1 страна из таблицы стран)
    calc_condition: "", // Условия расчета
    type_transaction: "", // Вид сделки
    number_receiving: null, // Номер поручения
    date_instruction: "", // Подписано поручение (дата)
    currency: "", // Валюта
    sum_order: null, // Сумма заявки
    vip_condition: "", // Условия VIP
    vip_commission: null, // VIP комиссия
    hide_commision: null,  // Скрытая комиссия
    commision_plus_percent: null, // Комиссия +% банка
    commision_plus_accredit: null, // Комиссия + аккредитив
    commision_plus_escrow: null, // Комиссия + эскроу
    money_rate: null, // Курс
    hide_money_rate: null, // Скрытый курс
    date_fixation_rate: "", // Дата фиксации курса
    order_rate_rub: null, // Заявка по курсу в рублях
    agency_award: null, // Агентское вознаграждение
    real_award: null, // Фактическое вознаграждение
    not_ours_award: null, // Агентское не наше
    sum: null, // ИТОГО
    letter_of_credit: false, // С аккредитивом
    take_first_doc: false, // Получили первичные документы
    invoice: "", // Инвойс
    date_contract_signed: "", // Подписан агент. / субагент. договор
    date_reg_bank: "", // Поставлен на учет в банке
    date_open_letter_of_credit: "", // Открыт аккредитив
    date_valet_agency: "", // Оплачена валюта поставщику (импорт) / субагенту (экспорт)
    date_taking_agency: "", // Получена валюта поставщиком (импорт) / субагентом (экспорт)
    date_paid_rub: "", // Оплачен рубль клиенту (экспорт)
    date_unhide_letter_of_credit: "", // Аккредитив раскрыт
    date_sign_act: "", // Подписан акт-отчет
    date_close_deal: "", // Сделка закрыта
    cycle_deal: null, // Цикл сделки, дн
    purpose_of_payment: "", // Назначение платежа
    subagent: [], // Субагент (может хранится субагент из таблицы субагентов)
    subagents_payer: [], // Плательщик Субагента (может хранится плательщик субагента из таблицы плательщик субагентов)
    serial_num_for_payer: null, // Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)
    date_docs_agent_and_subagent: "", // Подготовлены документы между агентом и субагентом (дата)
    date_taking_swift: "", // Получен SWIFT
    date_get_swift103: "", // Запросили SWIFT 103
    date_take_swift103: "", // Получили SWIFT 103
    date_get_swift199: "", // Запросили SWIFT 199
    date_take_swift199: "", // Получили SWIFT 199
    date_refund: "", // Возврат запрошен
    date_take_refund: "", // Деньги по возврату получены
    status_swift: "", // Статус SWIFT
    stuck_money: false, // Зависли деньги
    stage_problem: "", // Стадии проблемы
    comment_problem: "", // Комментарии к заявкам по которым зависли деньги
    stuck_money_name: "", // Какая валюта зависла?
    stuck_money_sum: null, // Сумма зависла
    mistake_is_it_name: "", // Чья ошибка?
    order_link: "", // Заявка ссылка
    invoice_link: "", // Инвойс ссылка
    assignment_link: "", // Поручение ссылка
    swift_link: "", // SWIFT ссылка
    swift103_link: "", 
    swift199_link: "",
    act_link: "",
    money_gone: false
  }
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState("")
  
  const closeModal = () => {
    setIsModalOpen(false)
    reset(defaultValue)
  };

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery("orders", () => api.orders.getAll(),
  {
    staleTime: 0.1 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: true
  }
);

  const createMutation = useMutation(
    (newOrder: IOrder) => api.orders.create(newOrder), 
    {
      onSuccess: () => {
        queryClient.invalidateQueries("orders");
        closeModal()
        toast.success("Заявка успешно создана!");
      },
    }
  );
  const deleteMutation = useMutation((id: number) => api.orders.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      toast.success("Заявка удалена успешно!");
    },
  });
  const updateMutation = useMutation((data: IOrder) => api.orders.update(data.id as number, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      closeModal()
      toast.success("Заявка обновлена успешно!");
    },
  });
  
  const handleDelete = async (order: IOrder) => {
    if (window.confirm("Удалить заявку?")) {
      deleteMutation.mutate(order.id!);
    }
  };
  const submit = (data: IOrder) => {
    console.log(data)
    // if (typeof data.id === "number") {
    //   updateMutation.mutate(data);
    // } else {
    //   createMutation.mutate(data);
    // }
  };
  const handleEdit = (order: IOrder) => {
    reset(order)
    setIsModalOpen(true);
    setModalHeader("Изменить заявку")
  };

  // const handleCellUpdate = async (id: number, key: string, value: any) => {
  //   try {
  //     await updateMutation.mutateAsync({
  //       id,
  //       data: { [key]: value },
  //     });
  //   } catch {
  //     toast.error("Ошибка обновления ячейки");
  //   }
  // };
  
  const methods = useForm<IOrder>({ defaultValues: defaultValue})
  const { reset } = methods

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        <DataTable
          title="Заявки"
          data={data?.data || []}
          columns={columns}
          onRefresh={() => refetch()}
          onAdd={() => {
            setIsModalOpen(true);
            setModalHeader("Добавить новую заявку")
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
          // onCellUpdate={handleCellUpdate}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalHeader}
      >
        <FormProvider {...methods}>
          <OrderForm
            onSubmit={submit}
            onClose={closeModal}
            isLoading={createMutation.isLoading || updateMutation.isLoading}
          />
        </FormProvider>
      </Modal>
    </div>
  );
};
