import React, {useState} from "react"
import {useQuery, useMutation, useQueryClient} from "react-query"
import {api} from "../api"
import {DataTable} from "../components/DataTable"
import {Modal} from "../components/Modal"
import {OrderForm} from "../components/OrderForm"
import {format} from "date-fns"
import {toast} from "react-toastify"
import type {IOrder} from "../types"

const columns = [
  {key: "autonumber", label: "ID", sortable: true},
  {key: "status", label: "Статус", sortable: true},
  {key: "order_number", label: "№ заявки", sortable: true},
  {key: "date", label: "Дата размещения", sortable: true},
  {key: "date_hired", label: "Взята в работу", sortable: true},
  {key: "name_agency", label: "Наименование экспортёра или импортёра", sortable: true},
  {key: "client_inn", label: "ИНН", sortable: true},
  {key: "swift_code", label: "SWIFT Код", sortable: true},
  {key: "currency", label: "Валюта", sortable: true},
  {key: "sum_order", label: "Сумма заявки", sortable: true},
  {key: "vip_commission", label: "VIP Комиссия", sortable: true},
  {key: "hide_commission", label: "Скрытая комиссия", sortable: true},
  {key: "commision_plus_percent", label: "Комиссия +% банка", sortable: true},
  {key: "commision_plus_accredit", label: "Комиссия + Аккредитив", sortable: true},
  {key: "commision_plus_escrow", label: "Commission + Эксроу", sortable: true},
  {key: "money_rate", label: "Курс", sortable: true},
  {key: "hide_money_rate", label: "Скрытый курс", sortable: true},
  {key: "date_fixation_rate", label: "Дата фиксация курса", sortable: true},
  {key: "order_rate_rub", label: "Заявка по курсу в рублях", sortable: true},
  {key: "agency_award", label: "Агентское вознаграждение", sortable: true},
  {key: "real_award", label: "Фактическое вознаграждение", sortable: true},
  {key: "not_ours_award", label: "Агентское не наше", sortable: true},
  {key: "sum", label: "ИТОГО", sortable: true},
  {key: "letter_of_credit", label: "С аккредитивом", sortable: true},
  {key: "take_first_doc", label: "Получили первичные документы", sortable: true},
  {key: "invoice", label: "Инвойс", sortable: true},
  {key: "date_contract_signed", label: "Подписан агент. / субагент. договор", sortable: true},
  {key: "date_reg_bank", label: "Поставлен на учет в банке", sortable: true},
  {key: "date_open_letter_of_credit", label: "Открыт аккредитив", sortable: true},
  {key: "date_valet_agency", label: "Оплачена валюта поставщику (импорт) / субагенту (экспорт)", sortable: true},
  {key: "date_taking_agency", label: "Получена валюта поставщиком (импорт) / субагентом (экспорт)", sortable: true},
  {key: "date_paid_rub", label: "Оплачен рубль клиенту (экспорт)", sortable: true},
  {key: "date_unhide_letter_of_credit", label: "Аккредитив раскрыт", sortable: true},
  {key: "date_sign_act", label: "Подписан акт-отчет", sortable: true},
  {key: "date_close_deal", label: "Сделка закрыта", sortable: true},
  {key: "cycle_deal", label: "Цикл сделки, дн", sortable: true},
  {key: "purpose_of_payment", label: "Назначение платежа", sortable: true},
  {
    key: "serial_num_for_payer",
    label: "Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)",
    sortable: true,
  },
  {key: "date_docs_agent_and_subagent", label: "Подготовлены документы между агентом и субагентом (дата)", sortable: true},
  {key: "date_taking_swift", label: "Получен SWIFT", sortable: true},
  {key: "date_get_swift103", label: "Получили SWIFT 103", sortable: true},
  {key: "date_take_swift103", label: "Запросили SWIFT 103", sortable: true},
  {key: "date_get_swift199", label: "Получили SWIFT 199", sortable: true},
  {key: "date_take_swift199", label: "Запросили SWIFT 199", sortable: true},
  {key: "date_refund", label: "Возврат запрошен", sortable: true},
  {key: "date_take_refund", label: "Деньги по возврату получены", sortable: true},
  {key: "status_swift", label: "Статус SWIFT", sortable: true},
  {key: "stuck_money", label: "Зависли деньги", sortable: true},
  {key: "stage_problem", label: "Стадии проблемы", sortable: true},
  {key: "comment_problem", label: "Комментарии к заявкам по которым зависли деньги", sortable: true},
  {key: "stuck_money_name", label: "Какая валюта зависла", sortable: true},
  {key: "stuck_money_sum", label: "Сумма зависла", sortable: true},
  {key: "mistake_is_it_name", label: "Чья ошибка?", sortable: true},
]

export const OrdersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Partial<IOrder> | null>(null)

  const queryClient = useQueryClient()
  const {data: orders, refetch} = useQuery("orders", () => api.orders.getAll())

  const createMutation = useMutation((newOrder: Partial<IOrder>) => api.orders.create(newOrder), {
    onSuccess: () => {
      queryClient.invalidateQueries("orders")
      setIsModalOpen(false)
      setSelectedOrder(null)
      toast.success("Order created successfully")
    },
  })

  const updateMutation = useMutation(({id, data}: {id: number; data: Partial<IOrder>}) => api.orders.update(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("orders")
      setIsModalOpen(false)
      setSelectedOrder(null)
      toast.success("Order updated successfully")
    },
  })

  const deleteMutation = useMutation((id: number) => api.orders.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("orders")
      toast.success("Order deleted successfully")
    },
  })

  const handleSubmit = (data: Partial<IOrder>) => {
    if (selectedOrder?.id) {
      updateMutation.mutate({id: selectedOrder.id, data})
    } else {
      createMutation.mutate(data)
    }
  }

  const handleEdit = (order: IOrder) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const handleDelete = async (order: IOrder) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteMutation.mutate(order.id!)
    }
  }

  const handleCellUpdate = async (id: number, key: string, value: any) => {
    try {
      await updateMutation.mutateAsync({
        id,
        data: {[key]: value},
      })
    } catch (error) {
      toast.error("Failed to update cell")
    }
  }

  return (
    <div className='h-full flex flex-col'>
      <div className='flex-1 overflow-hidden'>
        <DataTable
          title='Orders'
          data={orders?.data || []}
          columns={columns}
          onRefresh={() => refetch()}
          onAdd={() => {
            setSelectedOrder(null)
            setIsModalOpen(true)
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCellUpdate={handleCellUpdate}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedOrder(null)
        }}
        title={selectedOrder ? "Edit Order" : "Add New Order"}
      >
        <OrderForm onSubmit={handleSubmit} initialData={selectedOrder || {}} isLoading={createMutation.isLoading || updateMutation.isLoading} />
      </Modal>
    </div>
  )
}
