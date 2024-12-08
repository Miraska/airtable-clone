import { useFormContext } from "react-hook-form"
import { Controller } from "react-hook-form"
import { useQuery } from "react-query"
import { api } from "../api"
import { useMemo } from "react"
import Select from "react-select"

interface Option {
  value: string;
  label: string;
};

interface Props {
  canSelect: number[];
}

export default function PayersSelect({canSelect}: Props) {
  const { control } = useFormContext()
  
  const { data, isLoading } = useQuery(['subagentPayers'], () => api.subagentPayers.getAll());

  const options: Option[] = useMemo(() => {
    if (!data?.data) return [];
    return data.data
      .filter((item: any) => canSelect.includes(item.id))
      .map((item: any) => ({
        value: item.id,
        label: item.name ?? item.id,
      }));
  }, [data, canSelect]);

  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Плательщик Субагентов
      </label>
      <Controller
        name='subagentPayers'
        control={control}
        render={({ field }) => {
          const selectedOptions = options.filter((option) => {
            return field.value?.includes(option.value)
          });
          
          return (
            <Select
              {...field}
              isMulti
              options={options}
              unstyled
              value={selectedOptions}
              onChange={(selected) => {
                field.onChange(selected.map((option) => option.value));
              }}
              isLoading={isLoading}
              placeholder="Выберите плательщиков субагентов"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          )
        }}
      />
    </div>
  )
}