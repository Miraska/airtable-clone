import { useFormContext } from "react-hook-form"
import { Controller } from "react-hook-form"
import { RelationshipSelect } from "./RelationshipSelect"

export default function OrdersSelect() {
  const { control } = useFormContext()
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Заявки
      </label>
      <Controller
        name='orders'
        control={control}
        render={({field}) => (
          <RelationshipSelect
            type='orders'
            value={field.value || []}
            onChange={field.onChange}
            placeholder='Выберите заявки'
          />
        )}
      />
    </div>
  )
}