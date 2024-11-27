import axios from "axios";
import { useQuery } from "react-query";
import { Spinner, Typography } from "@material-tailwind/react";
import { OrderHead } from "../../../lib/OrderTable/OrderHead/OrderHead";
import IOrder from "../../../lib/OrderTable/IOrder/IOrder";
// import IOrder from "../../../interface/IOrder/IOrder";

interface Props {
  isOpen: boolean
}

export default function Order({ isOpen }:Props) {
  const getQueryData = async () => {
    const headers = {
      "ngrok-skip-browser-warning": "1"
    }
    const response = await axios.get('https://d06d-89-110-76-58.ngrok-free.app/api/requests', {headers})
    return response.data
  }
  
  const arrItem = []
  
  for (const key in OrderHead) {
    const typedKey = key as keyof IOrder
    arrItem.push(<th className="border-b border-r p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">{ OrderHead[typedKey] }</th>);
  }
  
  const result = useQuery("todos", getQueryData)
  
  if (result.isLoading) return (
    <div className={`${ isOpen ? "" : "hidden"} w-full h-full flex items-center justify-center`}>
      <Spinner />
    </div>
  )
  if (result.isError) return (
    <div className={`${ isOpen ? "" : "hidden"} w-full h-full flex items-center justify-center`}>
      <Typography color="red">{`${result.error}`}</Typography>
    </div>
  )
  if (result.isSuccess) {
    return (
      <table className={`min-w-max w-full table-auto border-collapse text-left ${isOpen ? "" : "hidden"}`}>
        <thead>
          <tr>
            {
              arrItem
            }
          </tr>
        </thead>
        <tbody>
          {/* <tr className="hover:bg-[#fafafa] dark:hover:bg-[#1e293b]">
            <td className="p-4 border-r border-b dark:border-gray-800">1</td>
            <td className="p-4 border-r border-b dark:border-gray-800">
              <Chip value="Заявка закрыта" variant="ghost" size="sm" color="green" />
            </td>
            <td className="p-4 border-r border-b dark:border-gray-800">109087</td>
          </tr>
          <tr className="hover:bg-[#fafafa] dark:hover:bg-[#1e293b]">
            <td className="p-4 border-r border-b dark:border-gray-800">2</td>
            <td className="p-4 border-r border-b dark:border-gray-800">
              <Chip value="Заявка закрыта" variant="ghost" size="sm" color="green" />
            </td>
            <td className="p-4 border-r border-b dark:border-gray-800">109090</td>
          </tr>
          <tr className="hover:bg-[#fafafa] dark:hover:bg-[#1e293b]">
            <td className="p-4 border-r border-b dark:border-gray-800">3</td>
            <td className="p-4 border-r border-b dark:border-gray-800">
              <Chip value="Заявка не закрыта" variant="ghost" size="sm" color="red" />
            </td>
            <td className="p-4 border-r border-b dark:border-gray-800">108974</td>
          </tr> */}
          {/* {
            result.data.map((item:object) => {
              return (
                <tr key={item.id} className="hover:bg-[#fafafa] dark:hover:bg-[#1e293b]">
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.autonumber}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    <Chip value={item.status} variant="ghost" size="sm" color={item.status == "Заявка закрыта" ? "red" : "green"} />
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.request_number}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.manager}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.reviewer}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.placement_date}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.placement_date}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.subagent}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.agent}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.client}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.client_inn}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.exporter_name}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.swift_code}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                  <td className="p-4 border-r border-b dark:border-gray-800">
                    {item.country}
                  </td>
                </tr>
              )
            })
          } */}
        </tbody>
      </table>
    )
  }
}