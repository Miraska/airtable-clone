import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react"
import useModalStore from "../../../store/useModalStore/useModalStore"
import useEditModalStore from "../../../store/useEditModalStore/useEditModalStore"

export default function Modal() {
  const {isOpen, handlerModal} = useModalStore()
  const handlerEditModal = useEditModalStore(store => store.handlerEdit)

  return (
    <Dialog
      open={isOpen}
      dismiss={{
        outsidePress: false,
      }}
      handler={handlerModal}
      className='dark:bg-gray-900'
    >
      <DialogHeader className='text-gray-900 dark:text-white'>Модальное окно</DialogHeader>
      <DialogBody className='text-gray-900 dark:text-white overflow-scroll'>Выберите тип модального окна</DialogBody>
      <DialogFooter>
        <Button variant='gradient' color='blue' className='mr-4' onClick={() => handlerEditModal(true)}>
          Изменение записи
        </Button>
        <Button variant='gradient' color='green' className='mr-4'>
          Добавление записи
        </Button>
        <Button variant='gradient' color='red' onClick={() => handlerModal(false)}>
          Закрыть
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
