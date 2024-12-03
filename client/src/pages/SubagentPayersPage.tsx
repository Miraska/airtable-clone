import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { ISubagentPayer } from '../types';
import { useForm } from 'react-hook-form';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Наименование' },
  { key: 'subagents', label: 'Субагенты' },
  { key: 'orders', label: 'Заявки' },
];

export const SubagentPayersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<ISubagentPayer>>({
    name: '',
    subagent: [],
    order: []
  });
  const { register, handleSubmit, control } = useForm<Partial<ISubagentPayer>>({ defaultValues: formData })
  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('subagent-payers', () => api.subagentPayers.getAll());
  const { data: subagents } = useQuery('subagents', () => api.subagents.getAll());
  const { data: orders } = useQuery('orders', () => api.orders.getAll());

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

  // const handleSubmit = (e: React.FormEvent) => {
  //   console.log()
  //   e.preventDefault();
  //   createMutation.mutate(formData);
  // };

  return (
    <>
      <DataTable
        title="Плательщики субагента"
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
              placeholder='Введите наименование субагента'
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
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
              className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
            >
              {subagents?.data?.map((subagent: any) => (
                <option key={subagent.id} value={subagent.id}>
                  {subagent.name}
                </option>
              ))}
            </select>
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