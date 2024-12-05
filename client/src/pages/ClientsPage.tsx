import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { IClient } from '../types';
import { FormProvider, useForm } from 'react-hook-form';
import OrdersSelect from '../components/OrdersSelect';
import { toast } from 'react-toastify';

import columns from '../lib/tableColumnsData/columnsClient';

export const ClientsPage = () => {
  const defaultValue = {
    name: '',
    inn: '',
    orders: []
  };
  
  const [modalHeader, setModalHeader] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const closeModal = () => {
    setIsModalOpen(false)
    reset(defaultValue)
  };

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('clients', () => api.clients.getAll(),
  {
    staleTime: 0.1 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: true
  });

  const createMutation = useMutation(
    (newClient: IClient) => api.clients.create(newClient),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('clients');
        toast.success("Клиент добавлен успешно!");
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
  const updateMutation = useMutation((data: IClient) => api.clients.update(data.id as number, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
      closeModal()
      toast.success("Клиент обновлен успешно!");
    }
  });
  
  const deleteClient = async (client: IClient) => {
    if (window.confirm("Удалить клиента из таблицы?")) {
      deleteMutation.mutate(client.id!)
    }
  };
  const submit = (newClient: IClient) => {
    if (typeof newClient.id === "number") {
      updateMutation.mutate(newClient)
    } else {
      createMutation.mutate(newClient)
    }
  };
  const edit = (client: IClient) => {
    reset(client)
    setIsModalOpen(true)
    setModalHeader("Изменить клиента")
  };

  const methods = useForm<IClient>({ defaultValues: defaultValue })
  const { register, handleSubmit, reset } = methods

  return (
    <>
      <DataTable
        title="Клиенты"
        data={data?.data || []}
        columns={columns}
        onRefresh={() => refetch()}
        onAdd={() => { 
          setIsModalOpen(true)
          setModalHeader("Добавить нового клиента")
        }}
        onDelete={deleteClient}
        onEdit={edit}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalHeader}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Наименование
              </label>
              <input
                type="text"
                placeholder='Введите наименование'
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
                disabled={createMutation.isLoading || updateMutation.isLoading}
              >
                {createMutation.isLoading || updateMutation.isLoading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};