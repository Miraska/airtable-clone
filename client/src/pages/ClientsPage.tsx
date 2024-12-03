import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { IClient } from '../types';
import { FormProvider, useForm } from 'react-hook-form';
import OrdersSelect from '../components/OrdersSelect';
import { toast } from 'react-toastify';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Наименование' },
  { key: 'inn', label: 'ИНН' },
  { key: 'orders', label: 'Заявки' },
];

const defaultValue = {
  name: '',
  inn: '',
  orders: []
}

export const ClientsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null)
  
  const closeModal = () => {
    setIsModalOpen(false)
    reset()
  }

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('clients', () => api.clients.getAll());
  const createMutation = useMutation(
    (newClient: IClient) => api.clients.create(newClient),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('clients');
        closeModal()
      },
    }
  );
  const deleteMutation = useMutation((id: number) => api.clients.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
      toast.success("Клиент удален успешно!");
    },
  });
  // const updateMutation = useMutation(({ id, data }: { id: number; data: IClient }) => api.clients.update(id, data), {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("clients");
  //     closeModal()
  //     toast.success("Клиент успешно обновлен!");
  //   }
  // })
  
  const deleteClient = async (client: IClient) => {
    if (window.confirm("Удалить клиента из таблицы?")) {
      deleteMutation.mutate(client.id!)
    }
  };
  const submit = (newSubagentPayer: IClient) => {
    createMutation.mutate(newSubagentPayer)
  };
  const edit = (client: IClient) => {
    setSelectedClient(client)
    console.log(client)
    setIsModalOpen(true)
  }

  const methods = useForm<IClient>({ defaultValues: defaultValue })
  const { register, handleSubmit, reset } = methods

  return (
    <>
      <DataTable
        title="Клиенты"
        data={data?.data || []}
        columns={columns}
        onRefresh={() => refetch()}
        onAdd={() => setIsModalOpen(true)}
        onDelete={deleteClient}
        onEdit={edit}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedClient ? "Изменить данные клиента" : "Добавить нового клиента"}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Наименование
              </label>
              <input
                type="text"
                placeholder='Введите наименование клиента'
                {...register('name')}
                className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                ИНН
              </label>
              <input
                type="text"
                {...register("inn")}
                placeholder='Введите ИНН клиента'
                className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <OrdersSelect/>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 text-white"
              >
                Закрыть
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md transition-all duration-300 hover:bg-blue-700"
                disabled={createMutation.isLoading}
              >
                {createMutation.isLoading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};