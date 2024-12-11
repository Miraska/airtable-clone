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

export default function ReviewOrdersSelect() {
  const { control } = useFormContext()
  
  const { data, isLoading } = useQuery(['orders'], () => api.orders.getAll());

  const options: Option[] = useMemo(() => {
    if (!data?.data) return [];
    return data.data
      .map((item: any) => ({
        value: item.id,
        label: item.name ?? item.id,
      }));
  }, [data]);
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Проверяю
      </label>
      <Controller
        name='reviews'
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
              placeholder="Выберите проверяемые заявки"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          )
        }}
      />
    </div>
  )
}