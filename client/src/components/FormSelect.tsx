import clsx from "clsx";
import React from "react";

interface FormSelectProps {
  labelText?: string;
  text: string;
  required?: boolean;
  value: string | null;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(({ labelText = "", required = false, text="", options, value, onChange}, ref) => {
  const baseClassName = clsx(
    "mt-1 block dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-gray-800 w-full"
  );
  
  return (
    <div className='flex flex-col justify-end'>
      <label className="block text-sm font-medium">{labelText} {required ? <sup className='text-red-600'>*</sup> : ""}</label>
      <select ref={ref} value={value as string} onChange={(e) => onChange(e.target.value)} className={baseClassName} required={required}>
        <option value="">Выберите {text}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
})