import { useFormContext } from "react-hook-form"
import { Controller } from "react-hook-form"
import { RelationshipSelect } from "./RelationshipSelect"

export default function CountriesSelect() {
  const { control } = useFormContext()
  
  return (
    <div className="col-span-2">
      <label className="block text-sm font-medium mb-1">
        Старна
      </label>
      <Controller
        name='country'
        control={control}
        render={({field}) => (
          <RelationshipSelect
            type='countries'
            value={field.value || []}
            onChange={field.onChange}
            placeholder='Выберите выберите страну'
          />
        )}
      />
    </div>
  )
}