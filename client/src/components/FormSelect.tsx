import clsx from "clsx";

interface FormSelectProps {
  labelText: string;
  required: boolean;
}

export default function FormSelect({ labelText, required }: FormSelectProps) {
  const baseClassName = clsx(
    "mt-1 block dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-gray-800 w-full"
  );
  
  return (
    <div className='flex flex-col justify-end'>
      <label className="block text-sm font-medium">{labelText}</label>
      <select className={baseClassName} required={required}>
      </select>
    </div>
  )
}