import { useFormContext } from "react-hook-form"
import { Controller } from "react-hook-form"
import { RelationshipSelect } from "./RelationshipSelect"

export default function SubagentsSelect() {
  const { control } = useFormContext()
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Субагенты
      </label>
      <Controller
        name='subagents'
        control={control}
        render={({field}) => (
          <RelationshipSelect
            type='subagents'
            value={field.value || []}
            onChange={field.onChange}
            placeholder='Выберите субагентов'
          />
        )}
      />
    </div>
  )
}