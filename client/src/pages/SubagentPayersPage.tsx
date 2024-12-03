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

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Наименование' },
  { key: 'subagents', label: 'Субагенты' },
  { key: 'orders', label: 'Заявки' },
];

const defaultValue = {
  name: '',
  subagents: [],
  orders: []
}

export const SubagentPayersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false)
    reset()
  }

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('subagent-payers', () => api.subagentPayers.getAll());
  const createMutation = useMutation(
    (newPayer: ISubagentPayer) => api.subagentPayers.create(newPayer),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('subagent-payers');
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
  
  const deleteSubagentPayer = async (subagentPayer: ISubagentPayer) => {
    if (window.confirm("Удалить плательщика субагента из таблицы?")) {
      deleteMutation.mutate(subagentPayer.id!)
    }
  };
  const submit = (newSubagentPayer: ISubagentPayer) => {
    createMutation.mutate(newSubagentPayer)
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
        onAdd={() => setIsModalOpen(true)}
        onDelete={deleteSubagentPayer}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Добавить плательщика субагента"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Наименование
              </label>
              <input
                type="text"
                placeholder='Введите наименование субагента'
                {...register("name")}
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