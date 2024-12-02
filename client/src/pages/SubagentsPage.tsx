import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { ISubagent } from '../types';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Наименование' },
  { key: 'payers', label: 'Плательщики Субагента' },
  { key: 'orders', label: 'Заявки'},
];

export const SubagentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<ISubagent>>({
    name: '',
  });

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('subagents', () => api.subagents.getAll());

  const createMutation = useMutation(
    (newSubagent: Partial<ISubagent>) => api.subagents.create(newSubagent),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('subagents');
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
        title="Субагенты"
        data={data?.data || []}
        columns={columns}
        onRefresh={() => refetch()}
        onAdd={() => setIsModalOpen(true)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавить субагента"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Наименование
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              placeholder='Введите наименование субагента'
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Плательщик субагента
            </label>
            
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Заявки
            </label>
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Плательщик субагента
            </label>
            
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
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Закрыть
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
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