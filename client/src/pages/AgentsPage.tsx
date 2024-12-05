import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { IAgent } from '../types';
import { FormProvider, useForm } from 'react-hook-form';
import OrdersSelect from '../components/OrdersSelect';
import { toast } from 'react-toastify';

import columns from '../lib/tableColumnsData/columnsAgent';

export const AgentsPage = () => {
  const defaultValue = {
    name: '',
    orders: []
  }
  
  const [modalHeader, setModalHeader] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const closeModal = () => {
    setIsModalOpen(false)
    reset(defaultValue)
  }

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('agents', () => api.agents.getAll(),
  {
    staleTime: 0.3 * 60 * 1000, 
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
        toast.success("Агент добавлен успешно!");
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
  const updateMutation = useMutation((data: IAgent) => api.agents.update(data.id as number, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("agents");
      closeModal()
      toast.success("Агент обновлен успешно!");
    }
  })
  
  const deleteAgents = async (agent: IAgent) => {
    if (window.confirm("Удалить агента из таблицы?")) {
      deleteMutation.mutate(agent.id!)
    }
  };
  const submit = (newAgent: IAgent) => {
    if (typeof newAgent.id === "number") {
      updateMutation.mutate(newAgent)
    } else {
      createMutation.mutate(newAgent)
    }
  };
  const edit = (agent: IAgent) => {
    reset(agent)
    setIsModalOpen(true)
    setModalHeader("Изменить агента")
  }

  const methods = useForm<IAgent>({ defaultValues: defaultValue })
  const { register, handleSubmit, reset } = methods
  
  return (
    <>
      <DataTable
        title="Агенты"
        data={data?.data || []}
        columns={columns}
        onRefresh={() => refetch()}
        onAdd={() => { 
          setIsModalOpen(true)
          setModalHeader("Добавить нового агента")
        }}
        onCellUpdate={submit}
        onDelete={deleteAgents}
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