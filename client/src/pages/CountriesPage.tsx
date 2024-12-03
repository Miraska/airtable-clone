import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { ICountry } from '../types';

import columns from '../lib/tableColumnsDara/columnsCountry';

export const CountriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<ICountry>>({
    name: '',
    code: '',
    full_name: '',
  });

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
    (newCountry: Partial<ICountry>) => api.countries.create(newCountry),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('countries');
        setIsModalOpen(false);
        setFormData({ name: '', code: '', full_name: '' });
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
        title="Страны"
        data={data?.data || []}
        columns={columns}
        onRefresh={() => refetch()}
        onAdd={() => setIsModalOpen(true)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавить новую страну"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Краткое название
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder='Введите краткое название страны'
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Код
            </label>
            <input
              type="text"
              value={formData.code || ''}
              placeholder='Введите код страны'
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Полное наименование
            </label>
            <input
              type="text"
              placeholder='Введите полное наименование страны'
              value={formData.full_name || ''}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Заявки
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