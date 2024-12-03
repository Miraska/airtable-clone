import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { IContragent } from '../types';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Наименование' },
  { key: 'orders', label: 'Заявки' },
];

export const ContractorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<IContragent>>({
    name: '',
    order: []
  });

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('contractors', () => api.contractors.getAll());

  const createMutation = useMutation(
    (newContractor: Partial<IContragent>) => api.contractors.create(newContractor),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contractors');
        setIsModalOpen(false);
        setFormData({ name: '' });
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <>
      <DataTable
        title="Контрагенты"
        data={data?.data || []}
        columns={columns}
        onRefresh={() => refetch()}
        onAdd={() => setIsModalOpen(true)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавить нового контрагента"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Наименование
            </label>
            <input
              type="text"
              value={formData.name || ''}
              placeholder='Введите наименование контрагента'
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Заявки
            </label>
            
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