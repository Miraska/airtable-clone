import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="space-y-6 p-6 bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-100 dark:border-dark-800">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="h-px bg-gradient-to-r from-blue-500/50 to-purple-500/50" />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}