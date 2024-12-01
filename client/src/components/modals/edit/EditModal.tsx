import {Dialog, DialogBody, DialogFooter, DialogHeader, Button} from "@material-tailwind/react"
import useEditModalStore from "../../../store/useEditModalStore/useEditModalStore"

export default function EditModal() {
  const {openEdit, handlerEdit} = useEditModalStore()

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
        <Button variant='gradient' color='red' onClick={() => handlerEdit(false)}>
          Закрыть
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
