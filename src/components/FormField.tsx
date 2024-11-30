import React from 'react';
import { clsx } from 'clsx';

interface FormFieldProps {
  label: string;
  type?: string;
  value: string | number;
  onChange: (value: string) => void;
  required?: boolean;
  options?: { value: string; label: string }[];
  multiple?: boolean;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  options,
  multiple = false,
  error,
}) => {
  const baseClassName = clsx(
    "mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
    {
      'border-red-300': error,
      'border-gray-300': !error,
    }
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
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
          {!multiple && <option value="">Select {label}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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