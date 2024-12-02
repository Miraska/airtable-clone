import React from 'react';
import { Dialog } from '@headlessui/react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Удалить',
  cancelLabel = 'Закрыть',
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm w-full bg-white rounded-lg shadow-xl">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                {title}
              </Dialog.Title>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-500">{message}</p>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-b-lg">
            <Button
              type="button"
              onClick={onConfirm}
              className="w-full sm:w-auto sm:ml-3"
              variant="primary"
            >
              {confirmLabel}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="mt-3 sm:mt-0 w-full sm:w-auto"
              variant="secondary"
            >
              {cancelLabel}
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};