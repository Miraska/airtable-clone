import { Card, Chip } from "@material-tailwind/react";

export default function Table() {
  return(
    <main id="table" className="w-full pr-2 flex items-center">
      <Card className="overflow-scroll w-full h-[calc(100vh-2rem)] border text-gray-900 dark:text-white dark:bg-gray-900 dark:border-gray-800">
        <table className="min-w-max w-fit table-auto text-left">
          <thead>
            <tr>
              <th className="border-b p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Автономер</th>
              <th className="border-b p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">Статус</th>
              <th className="border-b p-4 bg-gray-100 dark:bg-[#27272a] dark:border-gray-800">№ заявки</th>
            </tr>
          </thead>
          <tbody>
            <tr className="dark:hover:bg-[#1e293b]">
              <td className="p-4 border-b dark:border-gray-800">1</td>
              <td className="p-4 border-b dark:border-gray-800">
                <Chip value="Заявка закрыта" variant="ghost" size="sm" color="green"/>
              </td>
              <td className="p-4 border-b dark:border-gray-800">109087</td>
            </tr>
            <tr className="dark:hover:bg-[#1e293b]">
              <td className="p-4 border-b dark:border-gray-800">2</td>
              <td className="p-4 border-b dark:border-gray-800">
                <Chip value="Заявка закрыта" variant="ghost" size="sm" color="green"/>
              </td>
              <td className="p-4 border-b dark:border-gray-800">109090</td>
            </tr>
            <tr className="dark:hover:bg-[#1e293b]">
              <td className="p-4 border-b dark:border-gray-800">3</td>
              <td className="p-4 border-b dark:border-gray-800">
                <Chip value="Заявка не закрыта" variant="ghost" size="sm" color="red"/>
              </td>
              <td className="p-4 border-b dark:border-gray-800">108974</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </main>
  )
}
