import React from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { Edit, Trash2, Eye } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  value?: any;
  setIsEditing?: any;
  isEditing?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  value,
  setIsEditing,
  isEditing
}) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/10" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-14">
          <Dialog.Panel className="mx-auto max-w-xl w-full bg-white rounded-lg shadow-xl max-h-400">
            <div className="flex justify-between items-center p-4 border-b">
              <Dialog.Title className="text-lg font-semibold">
                {title}
              </Dialog.Title>
              <div>
                {(!isEditing && isEditing != null && <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-500 hover:text-yellow-600 transition-colors"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>)}
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="max-h-[80vh] overflow-scroll p-4">{children}</div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
