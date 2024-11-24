import { TableCellsIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Accordion, AccordionBody, AccordionHeader, Card, List, ListItem, ListItemPrefix, Typography, Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false) // Нужно сделать через стейт менеджер (Redux или Redux ToolKit)

  function handleOpen() {
    return setOpen(!open)
  }
  
  function handlerModal() {
    setOpenModal(!openModal)
  }
  
  return (
    <aside className="w-fit h-svh flex items-center px-2">
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 border">
        <Typography variant="h5" className="px-2">Airtable Clone</Typography>
        <hr className="my-2"/>
        <List>
          <Accordion open={open} icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          }>
            <ListItem className="p-0 flex flex-col" selected={open}>
              <AccordionHeader onClick={() => handleOpen()} className="border-b-0 p-3">
                <ListItemPrefix>
                  <TableCellsIcon className="h-5 w-5"/>
                </ListItemPrefix>
                <Typography className="mr-auto font-normal">Справочники</Typography>
              </AccordionHeader>
              <AccordionBody className="pb-0">
                <List className="p-0">
                  <ListItem>Менеджеры</ListItem>
                  <ListItem>Телефоны</ListItem>
                  <ListItem>Статусы</ListItem>
                </List>
              </AccordionBody>
            </ListItem>
          </Accordion>
          <ListItem onClick={() => handlerModal()}>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5"/>
            </ListItemPrefix>
            <Typography className="font-normal">Заявки</Typography>
          </ListItem>
        </List>
      </Card>
      <Dialog open={openModal} handler={handlerModal}>
        <DialogHeader>Это модальное окно</DialogHeader>
        <DialogBody>А это его контент</DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => handlerModal()}>Закрыть</Button>
        </DialogFooter>
      </Dialog>
    </aside>
  )
}