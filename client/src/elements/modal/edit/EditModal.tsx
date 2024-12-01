import useEditStore from "../../../hooks/useEditStore/useEditStore"
import Form from "../../form/Form"

export default function EditModal() {
  const data = useEditStore((store) => store.editData)
  const headers = useEditStore((store) => store.editHeader)
  
  return (
    <Form inputDefaultValues={data} inputLabel={headers}/>
  )
}