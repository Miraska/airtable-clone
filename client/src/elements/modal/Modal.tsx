import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import useModalStore from "../../hooks/useModalStore/useModalStore";
import { useTableStore } from "../../hooks/useTableStore/useTableStore";

export default function Modal() {
  const currentTable = useTableStore((store) => store.currentTable)
  const modalState = useModalStore((state) => state.isOpen)
  const handlerModalState = useModalStore((state) => state.handlerModal)
  
  return (
    <Dialog open={modalState} handler={handlerModalState} className="dark:bg-gray-900">
      <DialogHeader className="text-gray-900 dark:text-white">
        {currentTable}
      </DialogHeader>
      <DialogBody className="text-gray-900 dark:text-white">А это его контент</DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={() => handlerModalState(false)}>Закрыть</Button>
      </DialogFooter>
    </Dialog>
  )
}