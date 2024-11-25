import { TableCellsIcon, ChevronDownIcon, SunIcon } from "@heroicons/react/24/solid";
import { Accordion, AccordionBody, AccordionHeader, Card, List, ListItem, ListItemPrefix, Typography, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(true)

  function handleOpen() {
    return setOpen(!open)
  }
  
  // Обновляем класс `dark` в `<html>` при изменении состояния
  useEffect(() => {
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
  }, [dark]);
  
  return (
    <aside className="w-fit h-svh flex items-center px-2">
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 border dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <Typography variant="h5" className="px-2 text-gray-900 dark:text-white">Airtable Clone</Typography>
          <Button variant="filled" size="sm" className="bg-white border dark:bg-gray-900 dark:border-gray-800" onClick={() => setDark(!dark)}>
            <SunIcon className="h-5 w-5 text-gray-900 dark:text-white"/>
          </Button>
        </div>
        <hr className="my-2 dark:border-gray-800"/>
        <List>
          <ListItem className="text-gray-900 dark:text-white">
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5"/>
            </ListItemPrefix>
            <Typography className="font-normal">Заявки</Typography>
          </ListItem>
          <Accordion open={open} icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          }>
            <ListItem className="p-0 flex flex-col dark:text-white" selected={open}>
              <AccordionHeader onClick={() => handleOpen()} className="border-b-0 p-3 text-gray-900 dark:text-white">
                <ListItemPrefix>
                  <TableCellsIcon className="h-5 w-5"/>
                </ListItemPrefix>
                <Typography className="mr-auto font-normal">Справочники</Typography>
              </AccordionHeader>
              <AccordionBody className="pb-0">
                <List className="p-0 dark:text-white">
                  <ListItem>Менеджеры</ListItem>
                  <ListItem>Телефоны</ListItem>
                  <ListItem>Статусы</ListItem>
                </List>
              </AccordionBody>
            </ListItem>
          </Accordion>
        </List>
      </Card>
    </aside>
  )
}