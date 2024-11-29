import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react";
import useModalStore from "../../hooks/useModalStore/useModalStore";

export default function Modal() {
  const {isOpen, modalHeader, handlerModal, modalData} = useModalStore()
  
  
  return (
    <Dialog open={isOpen} handler={handlerModal} className="dark:bg-gray-900">
      <DialogHeader className="text-gray-900 dark:text-white">
        {modalHeader}
      </DialogHeader>
      <DialogBody className="text-gray-900 dark:text-white overflow-scroll">
        <form className="p-4 max-h-full h-[42rem] grid grid-cols-1 md:grid-cols-2 gap-4">
            {
              modalData.map((item: object, index) => {
                return (
                  <div key={index}>
                    {
                      Object.values(item).map((value, index) => (
                        <Input label="" type="text" defaultValue={value}/>
                      ))
                    }
                  </div>
                )
              })
            }
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={() => handlerModal(false)}>Закрыть</Button>
      </DialogFooter>
    </Dialog>
  )
}