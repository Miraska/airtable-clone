import { ICols } from "../../lib/interface/interface"
import FormCell from "./FormCell"
import useEditStore from "../../hooks/useEditStore/useEditStore"

interface Props {
  formHeader?: string,
  inputLabel: ICols,
  inputDefaultValues: object
}

export default function Form({inputDefaultValues, inputLabel}: Props) {
  const id = useEditStore((store) => store.editId)
  
  return (
    <div className="p-4 max-h-full h-fit grid grid-cols-1 md:grid-cols-2 gap-4">
      {
        Object.keys(inputDefaultValues).map((key, index) => (
          <FormCell label={inputLabel[key as keyof ICols]} key={index} value={inputDefaultValues.value}/>
        ))
      }
    </div>
  )
}