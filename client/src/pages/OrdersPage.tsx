import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "../api";
import { DataTable } from "../components/DataTable";
import { Modal } from "../components/Modal";
import { OrderForm } from "../components/OrderForm";
import { toast } from "react-toastify";
import type { IOrder } from "../types";

import columns from "../lib/tableColumnsDara/columnsOrder";

export const OrdersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Partial<IOrder> | null>(null);

  const queryClient = useQueryClient();
  const { data: orders, refetch } = useQuery("orders", () => {
    return api.orders.getAll()
  },
  {
    staleTime: 0.1 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: true
  }
);

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
    console.log(data)
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
    if (window.confirm("Удалить заявку?")) {
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
