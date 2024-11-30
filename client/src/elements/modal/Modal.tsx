import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import useModalStore from "../../hooks/useModalStore/useModalStore";
import EditModal from "./edit/EditModal";

export default function Modal() {
  const {isOpen, modalHeader, handlerModal} = useModalStore()
  
  return (
    <Dialog open={isOpen} handler={handlerModal} className="dark:bg-gray-900">
      <DialogHeader className="text-gray-900 dark:text-white">
        {modalHeader == undefined ? "" : modalHeader}
      </DialogHeader>
      <DialogBody className="text-gray-900 dark:text-white overflow-scroll">
        <EditModal />
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="green" className="mr-4">Изменить</Button>
        <Button variant="gradient" color="red" onClick={() => handlerModal(false)}>Закрыть</Button>
      </DialogFooter>
    </Dialog>
  )
}