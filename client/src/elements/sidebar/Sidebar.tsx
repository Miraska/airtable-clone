import { TableCellsIcon, SunIcon } from "@heroicons/react/24/solid";
import { Card, List, ListItem, ListItemPrefix, Typography, Button } from "@material-tailwind/react";
import { useEffect } from "react";
import { useTableStore } from "../../hooks/useTableStore/useTableStore";
import { useTheme } from "../../hooks/useTheme/useTheme";

export default function Sidebar() {
  const {isDark, setDark} = useTheme()
  
  const setCurrentTable = useTableStore((store) => store.setCurrentTable)
  
  // Обновляем класс `dark` в `<html>` при изменении состояния
  useEffect(() => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
  }, [isDark]);
  
  return (
    <aside className="w-fit flex items-center p-2">
      <Card className="h-full w-full max-w-72 p-4 border dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <Typography variant="h5" className="px-2 text-gray-900 dark:text-white">Airtable Clone</Typography>
          <Button variant="filled" size="sm" className="bg-white border dark:bg-gray-900 dark:border-gray-800" onClick={() => setDark(!isDark)}>
            <SunIcon className="h-5 w-5 text-gray-900 dark:text-white"/>
          </Button>
        </div>
        <hr className="my-2 dark:border-gray-800"/>
        <List className="overflow-scroll text-gray-900 dark:text-white">
          <ListItem onClick={() => { setCurrentTable("order") }}>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5"/>
            </ListItemPrefix>
            <Typography className="font-normal">Заявки</Typography>
          </ListItem>
          <ListItem onClick={() => { setCurrentTable("manager") }}>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5"/>
            </ListItemPrefix>
            Менеджеры
          </ListItem>
          <ListItem onClick={() => { setCurrentTable("contragent") }}>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5"/>
            </ListItemPrefix>
            Контрагенты
          </ListItem>
          <ListItem onClick={() => { setCurrentTable("agent") }}>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5"/>
            </ListItemPrefix>
            Агенты
          </ListItem>
          <ListItem onClick={() => { setCurrentTable("client") }}>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5"/>
            </ListItemPrefix>
            Клиенты
          </ListItem>
          <ListItem onClick={() => { setCurrentTable("country") }}>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5"/>
            </ListItemPrefix>
            Страна
          </ListItem>
          <ListItem onClick={() => { setCurrentTable("subagent") }}>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5"/>
            </ListItemPrefix>
            Субагенты
          </ListItem>
          <ListItem onClick={() => { setCurrentTable("subagent_payer") }}>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5"/>
            </ListItemPrefix>
            Плательщики субагентов
          </ListItem>
        </List>
      </Card>
    </aside>
  )
}