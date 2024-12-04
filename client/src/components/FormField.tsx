import React from 'react';
import { clsx } from 'clsx';

interface FormFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  selectText?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  required?: boolean;
  options?: { value: string; label: string }[];
  multiple?: boolean;
  error?: string | undefined;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  value,
  placeholder,
  selectText,
  onChange,
  required = false,
  options,
  multiple = false,
  error,
}) => {
  const baseClassName = clsx(
    "mt-1 block dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500",
    {
      'border-red-300': error,
      'border-gray-300 dark:border-gray-800': !error,
    },
    {
      'w-full': type != 'checkbox',
      'p-3': type == 'checkbox'
    }
  );

  return (
    <div className='flex flex-col justify-end'>
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClassName}
          required={required}
          multiple={multiple}
        >
          {!multiple && <option value="">Выберите {selectText}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          placeholder={placeholder}
          type={type}
          className={baseClassName}
          required={required}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};