import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "../api";
import { DataTable } from "../components/DataTable";
import { Modal } from "../components/Modal";
import { OrderForm } from "../components/OrderForm";
import { toast } from "react-toastify";
import type { IOrder } from "../types";

import FormulaEditor from "../components/FormulaEditor";
import columns from "../lib/tableColumnsData/columnsOrder";
import { FormProvider, useForm } from "react-hook-form";

export const OrdersPage = () => {
  const defaultValue = {
    // ЗАЯВКИ
    status: null, // Статус (закрыта, открыта, в работе и т. д.)
    order_number: null, // Номер (№) заявки
    managers: [], // Менеджеры (может хранится много менеджеров которые в другой таблице)
    reviewers: [], // Проверяющие (может хранится много менеджеров которые в другой таблице)
    date: null, // Дата размещения (дата)
    date_hired: null, // Взята в работу (дата)
    contragents: [], // Контрагент (может хранится много контрагентов из таблицы контрагенты)
    agents: [], // Агент (может хранится много агентов из таблицы агенты)
    clients: [], // Клиент (может хранится много клиентов из таблицы клиенты)
    client_inn: null, // ИНН (от клиента из таблицы клиентов)
    name_agency: null, // Наименование экспортёра или импортёра
    swift_code: null, // SWIFT Код банка получателя или отправителя
    countries: [], // Страна (может хранится 1 страна из таблицы стран)
    calc_condition: null, // Условия расчета
    type_transaction: null, // Вид сделки
    number_receiving: null, // Номер поручения
    date_instruction: null, // Подписано поручение (дата)
    currency: null, // Валюта
    sum_order: null, // Сумма заявки
    vip_condition: null, // Условия VIP
    vip_commission: null, // VIP комиссия
    hide_commission: null, // Скрытая комиссия
    commision_plus_percent: null, // Комиссия +% банка
    commision_plus_accredit: null, // Комиссия + аккредитив
    commision_plus_escrow: null, // Комиссия + эскроу
    money_rate: null, // Курс
    hide_money_rate: null, // Скрытый курс
    date_fixation_rate: null, // Дата фиксации курса
    order_rate_rub: null, // Заявка по курсу в рублях
    agency_award: null, // Агентское вознаграждение
    real_award: null, // Фактическое вознаграждение
    not_ours_award: null, // Агентское не наше
    sum: null, // ИТОГО
    letter_of_credit: false, // С аккредитивом
    take_first_doc: false, // Получили первичные документы
    invoice: null, // Инвойс
    date_contract_signed: null, // Подписан агент. / субагент. договор
    date_reg_bank: null, // Поставлен на учет в банке
    date_open_letter_of_credit: null, // Открыт аккредитив
    date_valet_agency: null, // Оплачена валюта поставщику (импорт) / субагенту (экспорт)
    date_taking_agency: null, // Получена валюта поставщиком (импорт) / субагентом (экспорт)
    date_paid_rub: null, // Оплачен рубль клиенту (экспорт)
    date_unhide_letter_of_credit: null, // Аккредитив раскрыт
    date_sign_act: null, // Подписан акт-отчет
    date_close_deal: null, // Сделка закрыта
    cycle_deal: null, // Цикл сделки, дн
    purpose_of_payment: null, // Назначение платежа
    subagents: [], // Субагент (может хранится субагент из таблицы субагентов)
    subagents_payers: [], // Плательщик Субагента (может хранится плательщик субагента из таблицы плательщик субагентов)
    serial_num_for_payer: null, // Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)
    date_docs_agent_and_subagent: null, // Подготовлены документы между агентом и субагентом (дата)
    date_taking_swift: null, // Получен SWIFT
    date_get_swift103: null, // Запросили SWIFT 103
    date_take_swift103: null, // Получили SWIFT 103
    date_get_swift199: null, // Запросили SWIFT 199
    date_take_swift199: null, // Получили SWIFT 199
    date_refund: null, // Возврат запрошен
    date_take_refund: null, // Деньги по возврату получены
    status_swift: null, // Статус SWIFT
    stuck_money: false, // Зависли деньги
    stage_problem: null, // Стадии проблемы
    comment_problem: null, // Комментарии к заявкам по которым зависли деньги
    stuck_money_name: null, // Какая валюта зависла?
    stuck_money_sum: null, // Сумма зависла
    mistake_is_it_name: null, // Чья ошибка?
    money_gone: false,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState("");

  const handleView = () => {
    setIsModalViewOpen(true);
  };

  const closeModal = () => {
    setIsModalViewOpen(false);
    setIsModalOpen(false);
    reset(defaultValue);
  };

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery("orders", () => api.orders.getAll(), {
    staleTime: 0.1 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: true,
  });

  const createMutation = useMutation(
    (newOrder: IOrder) => api.orders.create(newOrder),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("orders");
        closeModal();
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
  const updateMutation = useMutation(
    (data: IOrder) => api.orders.update(data.id as number, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("orders");
        closeModal();
        toast.success("Заявка обновлена успешно!");
      },
    }
  );

  const handleDelete = async (order: IOrder) => {
    if (window.confirm("Удалить заявку?")) {
      deleteMutation.mutate(order.id!);
    }
  };
  const submit = (data: IOrder) => {
    if (typeof data.id === "number") {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };
  const handleEdit = (order: IOrder) => {
    reset(order);
    setIsModalOpen(true);
    setModalHeader("Изменить заявку");
  };

  

  const methods = useForm<IOrder>({ defaultValues: defaultValue });
  const { reset } = methods;

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
            setModalHeader("Добавить новую заявку");
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCellUpdate={submit}
          onView={handleView}
          isModalViewOpen={isModalViewOpen}
          closeModal={closeModal}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalHeader}>
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
