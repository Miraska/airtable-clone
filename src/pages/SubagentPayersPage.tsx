import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { ISubagentPayer } from '../types';

const columns = [
  { key: 'name', label: 'Наименование' },
];

export const SubagentPayersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<ISubagentPayer>>({
    name: '',
    subagent: [],
  });

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('subagent-payers', () => api.subagentPayers.getAll());
  const { data: subagents } = useQuery('subagents', () => api.subagents.getAll());

  const createMutation = useMutation(
    (newPayer: Partial<ISubagentPayer>) => api.subagentPayers.create(newPayer),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('subagent-payers');
        setIsModalOpen(false);
        setFormData({ name: '', subagent: [] });
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
        title="Плательщик субагента"
        data={data?.data || []}
        columns={columns}
        onRefresh={() => refetch()}
        onAdd={() => setIsModalOpen(true)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавить плательщика субагента"
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Субагенты
            </label>
            <select
              multiple
              value={formData.subagent as string[]}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setFormData({ ...formData, subagent: values });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {subagents?.data?.map((subagent: any) => (
                <option key={subagent.id} value={subagent.id}>
                  {subagent.name}
                </option>
              ))}
            </select>
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