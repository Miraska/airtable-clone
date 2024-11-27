import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import useManagerStore from "../../hooks/useManagerStore/useManagerStore";
import useModalStore from "../../hooks/useModalStore/useModalStore";

export default function Modal() {
  const managerModal = useManagerStore((state) => state.isOpen)
  
  const modalState = useModalStore((state) => state.isOpen)
  const handlerModalState = useModalStore((state) => state.handlerModal)
  
  return (
    <Dialog open={modalState} handler={handlerModalState} className="dark:bg-gray-900">
      <DialogHeader className="text-gray-900 dark:text-white">
        {managerModal ? "Это модальное окно таблицы менеджеров" : "Это модальное окно заявок"}
      </DialogHeader>
      <DialogBody className="text-gray-900 dark:text-white">А это его контент</DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={() => handlerModalState(false)}>Закрыть</Button>
      </DialogFooter>
    </Dialog>
  )
}