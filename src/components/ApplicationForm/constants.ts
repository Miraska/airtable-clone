const baseInputStyles = `
  w-full
  rounded-lg
  border
  bg-white dark:bg-dark-800
  placeholder-gray-400 dark:placeholder-gray-500
  transition-colors
  duration-200
  ease-in-out
  focus:outline-none
  focus:ring-2
  focus:ring-offset-0
`;

const baseInputColors = `
  border-gray-300 dark:border-dark-700
  text-gray-900 dark:text-white
  focus:border-blue-500 dark:focus:border-blue-400
  focus:ring-blue-500/20 dark:focus:ring-blue-400/20
`;

const baseInputSizes = `
  px-4
  py-2.5
  text-sm
`;

export const inputClassName = `
  ${baseInputStyles}
  ${baseInputColors}
  ${baseInputSizes}
`;

export const selectClassName = `
  ${baseInputStyles}
  ${baseInputColors}
  ${baseInputSizes}
  pr-10
  appearance-none
  bg-no-repeat
  bg-right-4
  bg-[length:20px_20px]
  bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")]
`;

export const checkboxClassName = `
  h-5
  w-5
  rounded
  border-gray-300 dark:border-dark-700
  text-blue-600 dark:text-blue-400
  focus:ring-2
  focus:ring-blue-500/20 dark:focus:ring-blue-400/20
  transition-colors
  duration-200
  ease-in-out
`;

export const checkboxWrapperClassName = `
  flex
  items-center
  space-x-2
  min-h-[42px]
  py-2
`;

export const textareaClassName = `
  ${baseInputStyles}
  ${baseInputColors}
  ${baseInputSizes}
  min-h-[80px]
  resize-y
`;

export const fileInputClassName = `
  ${baseInputStyles}
  ${baseInputColors}
  file:mr-4
  file:py-2
  file:px-4
  file:rounded-md
  file:border-0
  file:text-sm
  file:font-medium
  file:bg-blue-50 dark:file:bg-blue-900/30
  file:text-blue-700 dark:file:text-blue-400
  hover:file:bg-blue-100 dark:hover:file:bg-blue-900/40
  file:cursor-pointer
  cursor-pointer
`;