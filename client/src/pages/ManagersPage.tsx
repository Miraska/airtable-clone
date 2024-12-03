import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { IManager } from '../types';
import { RelationshipSelect } from '../components/RelationshipSelect';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Имя' },
  { key: 'tel', label: 'Номер телефона' },
  { key: 'date', label: 'День рождения' },
  { key: 'orders', label: 'Заявки' },
  { key: 'review', label: 'Проверяю' }
];

export const ManagersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Partial<IManager> | null>(null);
  const [formData, setFormData] = useState<Partial<IManager>>({
    name: '',
    tel: '',
    date: '',
    order: [],
    review_table: []
  });

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('managers', () => api.managers.getAll());

  const createMutation = useMutation(
    (newManager: Partial<IManager>) => api.managers.create(newManager),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('managers');
        setIsModalOpen(false);
        setFormData({ name: '', tel: '', date: '', order: [], review_table: [] });
      },
    }
  );
  
  const handleEdit = (manager: IManager) => {
    setSelectedManager(manager);
    setIsModalOpen(true);
  };
  
  const { register, handleSubmit, control } = useForm<Partial<IManager>>({
    defaultValues: formData
  })
  
  const submit = () => createMutation.mutate(formData);

  return (
    <>
      <DataTable
        title="Менеджеры"
        data={data?.data || []}
        columns={columns}
        onRefresh={() => refetch()}
        onAdd={() => setIsModalOpen(true)}
        onEdit={handleEdit}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавить нового менеджера"
      >
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Имя
            </label>
            <input
              type="text"
              placeholder='Введите имя менеджера'
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Номер телефона
            </label>
            <input
              type="tel"
              placeholder='Введите номер телефона менеджера'
              value={formData.tel || ''}
              onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
              className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              День рождения
            </label>
            <input
              placeholder='Выберите день рождения'
              type="date"
              value={formData.date || ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Заявки
            </label>
            <Controller
              name='order'
              control={control}
              render={({field}) => (
                <RelationshipSelect
                  type='orders'
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder='Выберите заявки'
                />
              )}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Проверяю
            </label>
            <Controller
              name='order'
              control={control}
              render={({field}) => (
                <RelationshipSelect
                  type='orders'
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder='Выберите заявки'
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Заявки
            </label>
            {/* <Controller
              name='order'
              control={control}
              render={({field}) => (
                <RelationshipSelect
                  type='orders'
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder='Выберите заявки'
                />
              )}
            /> */}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
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
      </Modal>
    </>
  );
};