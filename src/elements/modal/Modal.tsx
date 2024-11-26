import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import useManagerStore from "../../hooks/useManagerStore/useManagerStore";

interface Props {
  open: boolean,
  handlerOpen: (state?: boolean) => void
}

export default function Modal({open, handlerOpen}:Props) {
  const managerModal = useManagerStore((state) => state.isOpen)
  
  return (
    <Dialog open={open} handler={handlerOpen} className="dark:bg-gray-900">
      <DialogHeader className="text-gray-900 dark:text-white">
        {managerModal ? "Это модальное окно таблицы менеджеров" : "Это модальное окно заявок"}
      </DialogHeader>
      <DialogBody className="text-gray-900 dark:text-white">А это его контент</DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={() => handlerOpen(false)}>Закрыть</Button>
      </DialogFooter>
    </Dialog>
  )
}