import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { ISubagentPayer } from '../types';
import { useForm, FormProvider } from 'react-hook-form';
import SubagentsSelect from '../components/SubagentSelect';
import OrdersSelect from '../components/OrdersSelect';
import { toast } from 'react-toastify';

import columns from '../lib/tableColumnsData/columnsSubagentPayer';

export const SubagentPayersPage = () => {
  const defaultValue = {
    name: '',
    subagents: [],
    orders: []
  }
  
  const [modalHeader, setModalHeader] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const closeModal = () => {
    setIsModalOpen(false)
    reset(defaultValue)
  }

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('subagent-payers', () => api.subagentPayers.getAll(),
  {
    staleTime: 0.3 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: true
  });
  
  const createMutation = useMutation(
    (newPayer: ISubagentPayer) => api.subagentPayers.create(newPayer),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('subagent-payers');
        toast.success("Плательщик Субагента добавлен успешно!");
        closeModal()
      },
    }
  );
  const deleteMutation = useMutation((id: number) => api.subagentPayers.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("subagent-payers");
      toast.success("Плательщик субагента удален успешно!");
    },
  });
  const updateMutation = useMutation((data: ISubagentPayer) => api.subagentPayers.update(data.id as number, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("subagent-payers");
      closeModal()
      toast.success("Плательщик Субагента обновлен успешно!");
    }
  });
  
  const deleteSubagentPayer = async (subagentPayer: ISubagentPayer) => {
    if (window.confirm("Удалить плательщика субагента из таблицы?")) {
      deleteMutation.mutate(subagentPayer.id!)
    }
  };
  const submit = (newSubagentPayer: ISubagentPayer) => {
    if (typeof newSubagentPayer.id === "number") {
      updateMutation.mutate(newSubagentPayer)
    } else {
      createMutation.mutate(newSubagentPayer)
    }
  };
  const edit = (subagentPayer: ISubagentPayer) => {
    reset(subagentPayer)
    setIsModalOpen(true)
    setModalHeader("Изменить плательщика субагента")
  };
  
  const methods = useForm<ISubagentPayer>({ defaultValues: defaultValue })
  const { register, handleSubmit, reset } = methods

  return (
    <>
      <DataTable
        title="Плательщики субагента"
        data={data?.data || []}
        columns={columns}
        onRefresh={() => refetch()}
        onAdd={() => { 
          setIsModalOpen(true)
          setModalHeader("Добавить нового плательщика субагента")
        }}
        onDelete={deleteSubagentPayer}
        onEdit={edit}
        onCellUpdate={submit}
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
                placeholder='Введите наименование субагента'
                className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <SubagentsSelect/>
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