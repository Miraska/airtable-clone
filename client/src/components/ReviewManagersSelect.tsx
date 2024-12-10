import { useFormContext } from "react-hook-form"
import { Controller } from "react-hook-form"
import { useQuery } from "react-query"
import { api } from "../api"
import { useEffect, useMemo } from "react"
import Select from "react-select"

interface Option {
  value: string;
  label: string;
};

interface Props {
  cantSelect: number[];
}

export default function ReviewManagersSelect({cantSelect}: Props) {
  const { control } = useFormContext()
  
  const { data, isLoading } = useQuery(['managers'], () => api.managers.getAll());

  const options: Option[] = useMemo(() => {
    if (!data?.data) return [];
    return data.data
      .filter((item: any) => !cantSelect.includes(item.id))
      .map((item: any) => ({
        value: item.id,
        label: item.name ?? item.id,
      }));
  }, [data, cantSelect]);
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Проверяющий
      </label>
      <Controller
        name='reviewers'
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