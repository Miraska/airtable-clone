import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { IManager } from '../types';
import { RelationshipSelect } from '../components/RelationshipSelect';
import { Controller, FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import OrdersSelect from '../components/OrdersSelect';
import { toast } from 'react-toastify';
import columns from '../lib/tableColumnsDara/columnsManager';

export const ManagersPage = () => {
  const defaultValue = {
    name: '',
    tel: '',
    date: '',
    orders: [],
  }
  
  const [modalHeader, setModalHeader] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const closeModal = () => {
    setIsModalOpen(false)
    reset(defaultValue)
  };

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('managers', () => api.managers.getAll(),
  {
    staleTime: 0.1 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: true
  });

  const createMutation = useMutation(
    (newManager: IManager) => api.managers.create(newManager),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('managers');
        toast.success("Менеджер добавлен успешно!");
        closeModal()
      },
    }
  );
  const deleteMutation = useMutation((id: number) => api.managers.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("managers");
      toast.success("Менеджер удален успешно!");
    },
  });
  const updateMutation = useMutation((data: IManager) => api.managers.update(data.id as number, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("managers");
      closeModal()
      toast.success("Менеджер обновлен успешно!");
    }
  });
  
  const deleteManager = async (manager: IManager) => {
    if (window.confirm("Удалить менеджера из таблицы?")) {
      deleteMutation.mutate(manager.id!)
    }
  };
  const submit = (newManager: IManager) => {
    if (typeof newManager.id === "number") {
      updateMutation.mutate(newManager)
    } else {
      createMutation.mutate(newManager)
    }
  };
  const edit = (manager: IManager) => {
    reset(manager)
    setIsModalOpen(true)
    setModalHeader("Изменить менеджера")
  };
  
  const methods = useForm<IManager>({ defaultValues: defaultValue })
  const { register, handleSubmit, control, reset } = methods

  return (
    <>
      <DataTable
        title="Менеджеры"
        data={data?.data || []}
        columns={columns}
        onRefresh={() => refetch()}
        onAdd={() => { 
          setIsModalOpen(true)
          setModalHeader("Добавить нового клиента")
        }}
        onDelete={deleteManager}
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
                Имя
              </label>
              <input
                type="text"
                placeholder='Введите имя менеджера'
                {...register("name")}
                className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Номер телефона
              </label>
              <input
                type="tel"
                {...register("tel")}
                placeholder='Введите номер телефона менеджера'
                className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                День рождения
              </label>
              <input
                placeholder='Выберите день рождения'
                type="date"
                {...register("date")}
                className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <OrdersSelect/>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Проверяю
              </label>
              <Controller
                name='review_table'
                control={control}
                render={({field}) => (
                  <RelationshipSelect
                    type='reviewers'
                    value={field.value || []}
                    onChange={field.onChange}
                    placeholder='Выберите заявки'
                  />
                )}
              />
            </div>
  
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