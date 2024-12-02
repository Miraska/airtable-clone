import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "../api";
import { DataTable } from "../components/DataTable";
import { Modal } from "../components/Modal";
import { OrderForm } from "../components/OrderForm";
import { toast } from "react-toastify";
import type { IOrder } from "../types";

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "autonumber", label: "Автономер", sortable: true },
  { key: "status", label: "Статус", sortable: true },
  { key: "order_number", label: "№ заявки", sortable: true },
  { key: "managers", label: "Менеджеры", sortable: false },
  { key: "reviewers", label: "Проверяющие", sortable: false },
  { key: "date", label: "Дата размещения", sortable: true },
  { key: "date_hired", label: "Взята в работу", sortable: true },
  { key: "contractors", label: "Контрагент", sortable: false },
  { key: "agents", label: "Агенты", sortable: false },
  { key: "clients", label: "Клиенты", sortable: false },
  { key: "client_inn", label: "ИНН клиента", sortable: true },
  { key: "name_agency", label: "Наименование экспортёра/импортёра", sortable: true },
  { key: "swift_code", label: "SWIFT код банка получателя (при импорте) / отправителя (при экспорте)", sortable: true },
  { key: "country", label: "Страна", sortable: true },
  { key: "calc_condition", label: "Условия расчета", sortable: true },
  { key: "type_transaction", label: "Вид сделки", sortable: true },
  { key: "number_receiving", label: "Номер поручения", sortable: true },
  { key: "date_instruction", label: "Подписано поручение (для Совкомбанка)", sortable: true },
  { key: "currency", label: "Валюта", sortable: true },
  { key: "sum_order", label: "Сумма заявки", sortable: true },
  { key: "vip_commission", label: "VIP Комиссия", sortable: true },
  { key: "hide_commision", label: "Скрытая комиссия", sortable: true },
  { key: "commision_plus_percent", label: "Комиссия +% банка", sortable: true },
  { key: "commision_plus_accredit", label: "Комиссия + Аккредитив", sortable: true },
  { key: "commision_plus_escrow", label: "Комиссия + Эскроу", sortable: true },
  { key: "money_rate", label: "Курс", sortable: true },
  { key: "hide_money_rate", label: "Скрытый курс", sortable: true },
  { key: "date_fixation_rate", label: "Дата фиксации курса", sortable: true },
  { key: "order_rate_rub", label: "Заявка по курсу в рублях", sortable: true },
  { key: "agency_award", label: "Агентское вознаграждение", sortable: true },
  { key: "real_award", label: "Фактическое вознаграждение", sortable: true },
  { key: "not_ours_award", label: "Агентское не наше", sortable: true },
  { key: "sum", label: "ИТОГО", sortable: true },
  { key: "letter_of_credit", label: "С аккредитивом", sortable: true },
  { key: "take_first_doc", label: "Получили первичные документы", sortable: true },
  { key: "invoice", label: "Инвойс", sortable: true },
  { key: "date_contract_signed", label: "Подписан агент. / субагент. договор", sortable: true },
  { key: "date_reg_bank", label: "Поставлен на учет в банке", sortable: true },
  { key: "date_open_letter_of_credit", label: "Открыт аккредитив", sortable: true },
  { key: "date_valet_agency", label: "Оплачена валюта поставщику (импорт) / субагенту (экспорт)", sortable: true },
  { key: "date_taking_agency", label: "Получена валюта поставщиком (импорт) / субагентом (экспорт)", sortable: true },
  { key: "date_paid_rub", label: "Оплачен рубль клиенту (экспорт)", sortable: true },
  { key: "date_unhide_letter_of_credit", label: "Аккредитив раскрыт", sortable: true },
  { key: "date_sign_act", label: "Подписан акт-отчет", sortable: true },
  { key: "date_close_deal", label: "Сделка закрыта", sortable: true },
  { key: "cycle_deal", label: "Цикл сделки (дни)", sortable: true },
  { key: "purpose_of_payment", label: "Назначение платежа", sortable: true },
  { key: "subagents", label: "Субагент", sortable: false },
  { key: "subagentPayers", label: "Плательщик субагента", sortable: false },
  { key: "serial_num_for_payer", label: "Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)", sortable: true },
  { key: "date_docs_agent_and_subagent", label: "Подготовлены документы между агентом и субагентом (дата)", sortable: true },
  { key: "date_taking_swift", label: "Получен SWIFT", sortable: true },
  { key: "date_get_swift103", label: "Запросили SWIFT 103", sortable: true },
  { key: "date_take_swift103", label: "Получили SWIFT 103", sortable: true },
  { key: "date_get_swift199", label: "Запросили SWIFT 199", sortable: true },
  { key: "date_take_swift199", label: "Получили SWIFT 199", sortable: true },
  { key: "date_refund", label: "Возврат запрошен", sortable: true },
  { key: "date_take_refund", label: "Деньги по возврату получены", sortable: true },
  { key: "status_swift", label: "Статус SWIFT", sortable: true },
  { key: "stuck_money", label: "Зависли деньги", sortable: true },
  { key: "stage_problem", label: "Стадии проблемы", sortable: true },
  { key: "comment_problem", label: "Комментарии к заявкам по которым зависли деньги", sortable: false },
  { key: "stuck_money_name", label: "Какая валюта зависла?", sortable: true },
  { key: "stuck_money_sum", label: "Сумма зависла", sortable: true },
  { key: "mistake_is_it_name", label: "Чья ошибка?", sortable: true },
  { key: "order_link", label: "Ссылка на заявку", sortable: false },
  { key: "invoice_link", label: "Ссылка на инвойс", sortable: false },
  { key: "assignment_link", label: "Ссылка на поручение", sortable: false },
  { key: "swift_link", label: "Ссылка на SWIFT", sortable: false },
  { key: "swift103_link", label: "Ссылка на SWIFT 103", sortable: false },
  { key: "swift199_link", label: "Ссылка на SWIFT 199", sortable: false },
  { key: "act_link", label: "Ссылка на акт-отчет", sortable: false },
  { key: "money_gone", label: "Сели деньги", sortable: true },
];

export const OrdersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Partial<IOrder> | null>(null);

  const queryClient = useQueryClient();
  const { data: orders, refetch } = useQuery("orders", () => api.orders.getAll());

  const createMutation = useMutation((newOrder: Partial<IOrder>) => api.orders.create(newOrder), {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      setIsModalOpen(false);
      setSelectedOrder(null);
      toast.success("Заявка успешно создана!");
    },
  });

  const updateMutation = useMutation(({ id, data }: { id: number; data: Partial<IOrder> }) => api.orders.update(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      setIsModalOpen(false);
      setSelectedOrder(null);
      toast.success("Заявка обновлена успешно!");
    },
  });

  const deleteMutation = useMutation((id: number) => api.orders.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      toast.success("Заявка удалена успешно!");
    },
  });

  const handleSubmit = (data: Partial<IOrder>) => {
    if (selectedOrder?.id) {
      updateMutation.mutate({ id: selectedOrder.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (order: IOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleDelete = async (order: IOrder) => {
    if (window.confirm("Вы хотите удалить эту заявку?")) {
      deleteMutation.mutate(order.id!);
    }
  };

  const handleCellUpdate = async (id: number, key: string, value: any) => {
    try {
      await updateMutation.mutateAsync({
        id,
        data: { [key]: value },
      });
    } catch {
      toast.error("Ошибка обновления ячейки");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        <DataTable
          title="Заявки"
          data={orders?.data || []}
          columns={columns}
          onRefresh={() => refetch()}
          onAdd={() => {
            setSelectedOrder(null);
            setIsModalOpen(true);
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCellUpdate={handleCellUpdate}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        title={selectedOrder ? "Изменить заявку" : "Добавить новую заявку"}
      >
        <OrderForm
          onSubmit={handleSubmit}
          initialData={selectedOrder || {}}
          isLoading={createMutation.isLoading || updateMutation.isLoading}
        />
      </Modal>
    </div>
  );
};
