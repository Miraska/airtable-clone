import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react"
import useModalStore from "../../../store/useCreateModalStore/useCreateModalStore"
import { useTheme } from "../../../store/useTheme/useTheme"
import { api } from "../../../lib/api/api"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { IManager, IOrder } from "../../../interface/interface"
import { useQuery } from "react-query"
import Select from "react-select"

export default function CreateModal() {
  const { isOpen, handler } = useModalStore()
  const isDark = useTheme((store) => store.isDark)
  const { register, handleSubmit, control } = useForm<IManager>({
    defaultValues: {
      name: '',
      tel: '',
      orders: []
    }
  })
  
  const resManagers = useQuery('managers', api.managers.getAll)
  const resOrders = useQuery('orders', api.orders.getAll)
  
  const orders = resOrders.data?.data
  
  const onSubmit: SubmitHandler<IManager> = data => {
    const ordersValue = data.orders.map((order: {value: string}) => order.value)
    const newManagers = { ...data, orders: ordersValue }
    api.managers.create(newManagers) 
  }
  
  return (
    <Dialog open={isOpen} dismiss={{ outsidePress: false, }} handler={handler} size="md" className='dark:bg-gray-900'>
      <DialogHeader className='text-gray-900 dark:text-white'>Модальное окно добавление менеджера</DialogHeader>
      <DialogBody className='text-gray-900 dark:text-white overflow-scroll'>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input {...register("name")} crossOrigin={"false"} variant="outlined" size="lg" color={isDark ? "white" : "gray"} label="Имя" />
          <Input {...register("tel")} crossOrigin={"nothing"} variant="outlined" size="lg" color={isDark ? "white" : "gray"} label="Номер телефона"/>
          <Input {...register("date")} crossOrigin={"false"} variant="outlined" size="lg" color={isDark ? "white" : "gray"} label="День рождения" placeholder="ГГГГ-ММ-ДД" pattern="^\+\d{4}-\d{1,2}\-\d{1,2}$"/>
          <Controller
            name="orders"
            control={control}
            render={({field}) => (
              <Select
                placeholder="Заявки"
                {...field}
                options={orders?.map((order: IOrder) => ({
                  value: order.id,
                  label: order.id
                }))}
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#212121", // цвет фона, как в Material Tailwind
                    borderColor: "rgb(176, 190, 197)", // Граница
                    padding: "3px",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#424242", // Для выпадающего меню
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: 
                      state.isFocused ? "#757575" : "transparent"
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#616161", // Для выбранного значения
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "inherit"
                  })
                }}
              />
            )}
          />
          <Button variant='gradient' color='green' type="submit">
            Добавить
          </Button>
          <DialogFooter>
            <Button variant="gradient" color="lime" className="mr-4" onClick={() => {
              console.log(resManagers.data?.data)
              console.log(orders)
            }}>
              Отправить запрос
            </Button>
            <Button variant='gradient' color='red' onClick={() => handler(false)}>
              Закрыть
            </Button>
          </DialogFooter>
        </form>
      </DialogBody>
    </Dialog>
  )
}
