import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { IContragent } from '../types';
import { FormProvider, useForm } from 'react-hook-form';
import OrdersSelect from '../components/OrdersSelect';
import { toast } from 'react-toastify';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Наименование' },
  { key: 'orders', label: 'Заявки' },
];

const defaultValue = {
  name: '',
  orders: []
}

export const ContractorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false)
    reset()
  }

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('contractors', () => api.contractors.getAll());
  const createMutation = useMutation(
    (newContractor: IContragent) => api.contractors.create(newContractor),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contractors');
        closeModal()
      },
    }
  );
  const deleteMutation = useMutation((id: number) => api.contractors.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("contractors");
      toast.success("Контрагент удален успешно!");
    }
  });

  const methods = useForm<IContragent>({ defaultValues: defaultValue })
  const { register, handleSubmit, reset } = methods
  
  const deleteContragent = async (contragent: IContragent) => {
    if (window.confirm("Удалить контрагента из таблицы")) {
      deleteMutation.mutate(contragent.id!)
    }
  }
  const submit = (newSubagentPayer: IContragent) => {
    createMutation.mutate(newSubagentPayer)
  }

  return (
    <>
      <DataTable
        title="Контрагенты"
        data={data?.data || []}
        columns={columns}
        onRefresh={() => refetch()}
        onAdd={() => setIsModalOpen(true)}
        onDelete={deleteContragent}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Добавить нового контрагента"
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
                placeholder='Введите наименование контрагента'
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