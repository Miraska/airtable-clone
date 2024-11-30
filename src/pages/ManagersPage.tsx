import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { IManager } from '../types';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'tel', label: 'Phone' },
  { key: 'date', label: 'Birth Date' },
];

export const ManagersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<IManager>>({
    name: '',
    tel: '',
    date: '',
  });

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('managers', () => api.managers.getAll());

  const createMutation = useMutation(
    (newManager: Partial<IManager>) => api.managers.create(newManager),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('managers');
        setIsModalOpen(false);
        setFormData({ name: '', tel: '', date: '' });
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
        title="Managers"
        data={data?.data || []}
        columns={columns}
        onRefresh={() => refetch()}
        onAdd={() => setIsModalOpen(true)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Manager"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
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
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.tel || ''}
              onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Birth Date
            </label>
            <input
              type="date"
              value={formData.date || ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              disabled={createMutation.isLoading}
            >
              {createMutation.isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};