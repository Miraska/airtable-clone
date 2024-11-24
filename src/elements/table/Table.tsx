import { Card } from "@material-tailwind/react";

export default function Table() {
  return(
    <main id="table" className="w-full px-2 flex items-center">
      <Card className="overflow-scroll w-full h-[calc(100vh-2rem)] border">
        <table className="min-w-max w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border-b p-4 bg-gray-200 border-gray-400">Автономер</th>
              <th className="border-b p-4 bg-gray-200 border-gray-400">Статус</th>
              <th className="border-b p-4 bg-gray-200 border-gray-400">№ заявки</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border-b">1</td>
              <td className="p-4 border-b bg-gray-100">Заявка закрыта</td>
              <td className="p-4 border-b">109087</td>
            </tr>
            <tr>
              <td className="p-4 border-b">2</td>
              <td className="p-4 border-b bg-gray-100">Заявка закрыта</td>
              <td className="p-4 border-b">109090</td>
            </tr>
            <tr>
              <td className="p-4 border-b">3</td>
              <td className="p-4 border-b bg-gray-100">Заявка не закрыта</td>
              <td className="p-4 border-b">108974</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </main>
  )
}