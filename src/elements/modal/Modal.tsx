import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";

interface Props {
  open: boolean,
  handlerOpen: () => void
}

export default function Modal({open, handlerOpen}:Props) {
  return (
    <Dialog open={open} handler={handlerOpen}>
      <DialogHeader>Это модальное окно</DialogHeader>
      <DialogBody>А это его контент</DialogBody>
      <DialogFooter>
        <Button variant="text" color="red">Закрыть</Button>
      </DialogFooter>
    </Dialog>
  )
}