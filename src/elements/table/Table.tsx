import { Card, Chip } from "@material-tailwind/react";
import useManagerStore from "../../hooks/useManagerStore/useManagerStore";
import Order from "./order/Order";

export default function Table() {
  
  const isManagerOpen = useManagerStore((state) => state.isOpen)
  
  return(
    <Card className="w-full h-full overflow-scroll border text-gray-900 dark:text-white dark:bg-gray-900 dark:border-gray-800">
      <Order isOpen={ !isManagerOpen } />
      <table className={`min-w-max w-full table-auto border-collapse text-left ${ isManagerOpen ? "" : "hidden"}`}>
        <thead>
          <tr>
            <th className="border-b p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Имя</th>
            <th className="border-b p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Номер</th>
            <th className="border-b p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">№ заявки</th>
          </tr>
        </thead>
        <tbody>
          <tr className="dark:hover:bg-[#1e293b]">
            <td className="p-4 border-b dark:border-gray-800">Марат</td>
            <td className="p-4 border-b dark:border-gray-800">
              <Chip value="+7 987 654 32 10" variant="ghost" size="sm" color="green"/>
            </td>
            <td className="p-4 border-b dark:border-gray-800">109087</td>
          </tr>
          <tr className="dark:hover:bg-[#1e293b]">
            <td className="p-4 border-b dark:border-gray-800">Камиль</td>
            <td className="p-4 border-b dark:border-gray-800">
              <Chip value="+7 987 654 32 10" variant="ghost" size="sm" color="green"/>
            </td>
            <td className="p-4 border-b dark:border-gray-800">109087</td>
          </tr>
          <tr className="dark:hover:bg-[#1e293b]">
            <td className="p-4 border-b dark:border-gray-800">Тамара</td>
            <td className="p-4 border-b dark:border-gray-800">
              <Chip value="+7 987 654 32 10" variant="ghost" size="sm" color="green"/>
            </td>
            <td className="p-4 border-b dark:border-gray-800">109087</td>
          </tr>
        </tbody>
      </table>
    </Card>
  )
}
