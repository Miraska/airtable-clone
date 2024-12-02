import {Dialog, DialogBody, DialogFooter, DialogHeader, Button} from "@material-tailwind/react"
import useEditModalStore from "../../../store/useEditModalStore/useEditModalStore"
import useCreateModalStore from "../../../store/useCreateModalStore/useCreateModalStore"

export default function EditModal() {
  const {openEdit, handlerEdit} = useEditModalStore()
  const create = useCreateModalStore((store) => store.handler)
  
  return (
    <Dialog
      open={openEdit}
      dismiss={{
        outsidePress: false,
      }}
      handler={handlerEdit}
      className='dark:bg-gray-900'
    >
      <DialogHeader className='text-gray-900 dark:text-white'>Модальное окно изменений</DialogHeader>
      <DialogBody className='text-gray-900 dark:text-white overflow-scroll'>Допустим здесь его контент</DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="blue" className="mr-4">
          Изменить
        </Button>
        <Button variant='gradient' color='red' onClick={() => handlerEdit(false)}>
          Закрыть
        </Button>
        <Button variant="gradient" onClick={() => create(true)}>создать</Button>
      </DialogFooter>
    </Dialog>
  )
}
