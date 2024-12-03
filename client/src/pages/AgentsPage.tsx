import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { IAgent } from '../types';
import { FormProvider, useForm } from 'react-hook-form';
import OrdersSelect from '../components/OrdersSelect';
import { toast } from 'react-toastify';

import columns from '../lib/tableColumnsDara/columnsAgent';

const defaultValue = {
  name: '',
  orders: []
}

export const AgentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false)
    reset()
  }

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('agents', () => api.agents.getAll(),
  {
    staleTime: 0.1 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: true
  });

  const createMutation = useMutation(
    (newAgent: IAgent) => api.agents.create(newAgent),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('agents');
        closeModal()
      },
    }
  );
  const deleteMutation = useMutation((id: number) => api.agents.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("agents")
      toast.success("Агент удален успешно!");
    }
  })
  
  const deleteAgents = async (agent: IAgent) => {
    if (window.confirm("Удалить агента из таблицы?")) {
      deleteMutation.mutate(agent.id!)
    }
  }
  const submit = (newSubagentPayer: IAgent) => {
    createMutation.mutate(newSubagentPayer)
  }

  const methods = useForm<Partial<IAgent>>({ defaultValues: defaultValue })
  const { register, handleSubmit, reset } = methods
  
  return (
    <>
      <DataTable
        title="Агенты"
        data={data?.data || []}
        columns={columns}
        onRefresh={() => refetch()}
        onAdd={() => setIsModalOpen(true)}
        onDelete={deleteAgents}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Добавить нового агента"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Наименование
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder='Введите наименование агента'
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