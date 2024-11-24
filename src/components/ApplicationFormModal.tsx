import React from 'react';
import { X } from 'lucide-react';
import { ApplicationForm } from './ApplicationForm';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSubmit: (data: any) => void;
}

export function ApplicationFormModal({
  isOpen,
  onClose,
  initialData,
  onSubmit
}: ApplicationFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-dark-900 rounded-lg shadow-xl w-full max-w-4xl my-8">
        <div className="flex justify-between items-center px-6 py-4 border-b dark:border-dark-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {initialData ? 'Редактирование заявки' : 'Новая заявка'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <ApplicationForm
            initialData={initialData}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}