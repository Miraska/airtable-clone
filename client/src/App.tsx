import { Card } from "@material-tailwind/react"
import Sidebar from "./elements/sidebar/Sidebar"
import Modal from "./elements/modal/Modal"
// import OrderTable from "./elements/table/Order"

function App() {
  
  return (
    <div className="flex w-full h-full">
      <Sidebar/>
      <main className="pt-2 pb-2 pr-2 flex flex-col w-full overflow-scroll">
        <Card className="w-full h-full overflow-scroll border text-gray-900 dark:text-white dark:bg-gray-900 dark:border-gray-800">
          Таблица
        </Card>
      </main>
      <Modal/>
    </div>
  )
}

export default App