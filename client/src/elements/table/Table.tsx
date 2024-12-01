import { Typography } from "@material-tailwind/react"
import useModalStore from "../../hooks/useModalStore/useModalStore";
import { ITable, ICols } from "../../lib/interface/interface";
import useEditStore from "../../hooks/useEditStore/useEditStore";


interface TableProps {
  tableName: string;
  data: ITable[];
  columns: ICols;
}

export default function Table({columns, data, tableName }:TableProps) {
  const {handlerModal} = useModalStore()
  const handlerEdit = useEditStore((store) => store.handlerEditStore)
  
  return(
    <>
      <div className="p-4">
        <Typography variant="h4">{ tableName }</Typography>
      </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {Object.values(columns).map((value, index) => {
              return (
                <th key={index} className="border p-4 bg-gray-100 dark:bg-gray-700 dark:border-gray-800">
                  {value}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row: ITable) => {
            return (
              <tr key={row.id} onClick={() => {
                  handlerEdit(row.id, row, columns)
                  handlerModal(true, `Изменить "${row.name}"`)
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
