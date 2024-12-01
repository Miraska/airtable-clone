import {TableCellsIcon, SunIcon} from "@heroicons/react/24/solid"
import {Card, List, ListItem, ListItemPrefix, Typography, Button} from "@material-tailwind/react"
import {useEffect} from "react"
import {useTheme} from "../../store/useTheme/useTheme"
import useModalStore from "../../store/useModalStore/useModalStore"
import useEditModalStore from "../../store/useEditModalStore/useEditModalStore"

export default function Sidebar() {
  const {isDark, setDark} = useTheme()
  const handlerModal = useModalStore(store => store.handlerModal)
  const handlerEdit = useEditModalStore(store => store.handlerEdit)

  // Обновляем класс `dark` в `<html>` при изменении состояния
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  return (
    <aside className='w-fit flex items-center p-2'>
      <Card className='h-full w-full max-w-72 p-4 border dark:bg-gray-900 dark:border-gray-800'>
        <div className='flex items-center justify-between'>
          <Typography variant='h5' className='px-2 text-gray-900 dark:text-white'>
            Airtable Clone
          </Typography>
          <Button variant='filled' size='sm' className='bg-white border dark:bg-gray-900 dark:border-gray-800' onClick={() => setDark(!isDark)}>
            <SunIcon className='h-5 w-5 text-gray-900 dark:text-white' />
          </Button>
        </div>
        <hr className='my-2 dark:border-gray-800' />
        <List className='overflow-scroll text-gray-900 dark:text-white'>
          <ListItem onClick={() => handlerModal(true)}>
            <ListItemPrefix>
              <TableCellsIcon className='h-5 w-5' />
            </ListItemPrefix>
            <Typography className='font-normal'>Заявки</Typography>
          </ListItem>
          <ListItem onClick={() => handlerEdit(true)}>
            <ListItemPrefix>
              <TableCellsIcon className='h-5 w-5' />
            </ListItemPrefix>
            Менеджеры
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <TableCellsIcon className='h-5 w-5' />
            </ListItemPrefix>
            Контрагенты
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <TableCellsIcon className='h-5 w-5' />
            </ListItemPrefix>
            Агенты
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <TableCellsIcon className='h-5 w-5' />
            </ListItemPrefix>
            Клиенты
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <TableCellsIcon className='h-5 w-5' />
            </ListItemPrefix>
            Страна
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <TableCellsIcon className='h-5 w-5' />
            </ListItemPrefix>
            Субагенты
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <TableCellsIcon className='h-5 w-5' />
            </ListItemPrefix>
            Плательщики субагентов
          </ListItem>
        </List>
      </Card>
    </aside>
  )
}
