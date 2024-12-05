import { useFormContext } from "react-hook-form"
import { Controller } from "react-hook-form"
import { RelationshipSelect } from "./RelationshipSelect"

export default function SubagentPayersSelect() {
  const { control } = useFormContext()
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Плательщик Субагентов
      </label>
      <Controller
        name='payers'
        control={control}
        render={({field}) => (
          <RelationshipSelect
            type='subagentPayers'
            value={field.value || []}
            onChange={field.onChange}
            placeholder='Выберите плательщиков субагентов'
          />
        )}
      />
    </div>
  )
}