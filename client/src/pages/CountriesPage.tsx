import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { ICountry } from '../types';
import { FormProvider, useForm } from 'react-hook-form';
import OrdersSelect from '../components/OrdersSelect';
import { toast } from 'react-toastify';

import columns from '../lib/tableColumnsData/columnsCountry';

const defaultValue = {
  name: '',
  code: '',
  full_name: '',
  orders: []
}

export const CountriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false)
    reset()
  }

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('countries', () => api.countries.getAll(),
  {
    staleTime: 0.1 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: true
  });

  const createMutation = useMutation(
    (newCountry: ICountry) => api.countries.create(newCountry),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('countries');
        closeModal()
      },
    }
  );
  const deleteMutation = useMutation((id: number) => api.countries.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("countries");
      toast.success("Страна удалена успешно!");
    },
  });
  
  const deleteCountry = async (country: ICountry) => {
    if (window.confirm("Удалить страну из таблицы?")) {
      deleteMutation.mutate(country.id!)
    }
  };
  const submit = (newCountry: ICountry) => {
    createMutation.mutate(newCountry);
  };
  
  const methods = useForm<ICountry>({ defaultValues: defaultValue })
  const { register, handleSubmit, reset } = methods

  return (
    <>
      <DataTable
        title="Страны"
        data={data?.data || []}
        columns={columns}
        onRefresh={() => refetch()}
        onAdd={() => setIsModalOpen(true)}
        onDelete={deleteCountry}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Добавить новую страну"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Краткое название
              </label>
              <input
                type="text"
                {...register('name')}
                className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder='Введите краткое название страны'
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Код
              </label>
              <input
                {...register('code')}
                type="text"
                placeholder='Введите код страны'
                className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Полное наименование
              </label>
              <input
                {...register('full_name')}
                type="text"
                placeholder='Введите полное наименование страны'
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