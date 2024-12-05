import React from 'react';
import { clsx } from 'clsx';

interface FormFieldProps {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  value?: string;
  readonly?: boolean;
  step?: number
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(({label = "", type = 'text', placeholder, required = false, readonly = false, step = 1,...props }, ref) => {
  const baseClassName = clsx(
    "mt-1 block dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-gray-800",
    {
      'w-full': type != 'checkbox',
      'p-3': type == 'checkbox'
    }
  );

  return (
    <div className='flex flex-col justify-end'>
        <label className="block text-sm font-medium">{label}{required ? <sup className='text-red-600'> обязательное</sup> : ""}</label>
      <input
        ref={ref}
        placeholder={placeholder}
        type={type}
        step={step}
        className={baseClassName}
        required={required}
        readOnly={readonly}
        {...props}
      />
    </div>
  );
});