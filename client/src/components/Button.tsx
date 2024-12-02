import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 text-sm font-medium rounded-md transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400':
            variant === 'primary',
          'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100':
            variant === 'secondary',
        },
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? 'Загрузка...' : children}
    </button>
  );
};