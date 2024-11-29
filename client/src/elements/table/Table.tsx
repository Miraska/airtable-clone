import { Typography } from "@material-tailwind/react"
import useModalStore from "../../hooks/useModalStore/useModalStore";

interface ICols {
  key: string,
  label: string
}

interface ISubagent { // СУБАГЕНТЫ
  id: number; // Уникальный id
  name?: string | null; // Наименование
  subagent_payer?: string[] | null | string; // Массив ID плательщиков субагентов (может хранится много плательщиков субагентов из таблицы субагенты)
  order?: number[] | null | string; // Массив ID заявок (может хранится много заявок из таблицы заявки)
}

interface ISubagentPayer { // ПЛАТЕЛЬЩИКИ СУБАГЕНТОВ
  id?: number; // Уникальный id
  name?: string; // Наименование
  subagent?: string[] | null | string; // Массив ID субагентов (может хранится много субагентов из таблицы субагенты)
  order?: number[] | null | string; // Массив ID заявок (может хранится много заявок из таблицы заявки)
}

interface TableProps {
  tableName: string
  data: [];
  columns: ICols[];
}

export default function Table({columns, data, tableName}:TableProps) {
  const {handlerModal} = useModalStore()
  const {setDataModal} = useModalStore()
  
  return(
    <>
      <div className="p-4">
        <Typography variant="h4">{ tableName }</Typography>
      </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th key={column.key} className="border-y p-4 bg-gray-100 dark:bg-gray-700 dark:border-gray-800">
                  {column.label}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr key={row.id} onClick={() => {
                  handlerModal(true, tableName)
                  setDataModal(data)
                }
              }>
                {
                  Object.values(row).map((value, index) => (
                    <th className="p-4 border dark:border-gray-800" key={index}>
                      {value}
                    </th>
                  ))
                }
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
