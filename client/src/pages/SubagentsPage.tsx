import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { ISubagent } from '../types';
import { FormProvider, useForm } from 'react-hook-form';
import SubagentPayersSelect from '../components/SubagentPayersSelect';
import OrdersSelect from '../components/OrdersSelect';
import { toast } from 'react-toastify';

import columns from '../lib/tableColumnsData/columnsSubagent';

export const SubagentsPage = () => {
  const defaultValue = {
    name: '',
    payers: [],
    orders: []
  }
  
  const [modalHeader, setModalHeader] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);

  const handleView = () => {
    setIsModalViewOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false)
    setIsModalViewOpen(false);
    reset(defaultValue)
  }

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('subagents', () => api.subagents.getAll(),
  {
    staleTime: 0.3 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: true
  });

  const createMutation = useMutation(
    (newSubagent: ISubagent) => api.subagents.create(newSubagent),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('subagents');
        toast.success("Субагент добавлен успешно!");
        closeModal()
      },
    }
  );
  const deleteMutation = useMutation((id: number) => api.subagents.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("subagents");
      toast.success("Субагент удален успешно!");
    },
  });
  const updateMutation = useMutation((data: ISubagent) => api.subagents.update(data.id as number, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("subagents");
      closeModal()
      toast.success("Субагент обновлен успешно!");
    }
  });
  
  const deleteSubagent = async (subagent: ISubagent) => {
    if (window.confirm("Удалить субагента из таблицы?")) {
      deleteMutation.mutate(subagent.id!)
    }
  };
  const submit = (newSubagent: ISubagent) => {
    if (typeof newSubagent.id === "number") {
      updateMutation.mutate(newSubagent)
    } else {
      createMutation.mutate(newSubagent);
    }
  };
  const edit = (subagent: ISubagent) => {
    reset(subagent)
    setIsModalOpen(true)
    setModalHeader("Изменить субагента")
  };
  
  const methods = useForm<ISubagent>({ defaultValues: defaultValue })
  const { register, handleSubmit, reset } = methods

  return (
    <>
      <DataTable
          title="Субагенты"
          data={data?.data || []}
          columns={columns}
          onRefresh={() => refetch()}
          onAdd={() => {
            setIsModalOpen(true);
            setModalHeader("Добавить нового субагента");
          }}
          onEdit={edit}
          onDelete={deleteSubagent}
          onCellUpdate={submit}
          onView={handleView}
          isModalViewOpen={isModalViewOpen}
          closeModal={closeModal}
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
                Наименование<sup className='text-red-600'> обязательное</sup>
              </label>
              <input
                type="text"
                {...register("name")}
                className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder='Введите наименование субагента'
              />
            </div>
            <SubagentPayersSelect/>
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