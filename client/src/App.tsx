import { Card, Button } from "@material-tailwind/react"
import Sidebar from "./elements/sidebar/Sidebar"
import Tables from "./elements/table/Tables"
import Modal from "./elements/modal/Modal"
import { ArrowPathIcon } from "@heroicons/react/24/solid"
import useModalStore from "./hooks/useModalStore/useModalStore"

function App() {
  const handlerModal = useModalStore((state) => state.handlerModal)
  
  return (
    <div className="flex w-full h-full">
      <Sidebar/>
      <main className="pt-2 pb-2 pr-2 flex flex-col w-full overflow-scroll">
        <Card className="w-ful border mb-2 p-4 overflow-y-scroll dark:text-white dark:bg-gray-900 dark:border-gray-800">
          <div className="flex flex-row gap-4 min-w-max">
            <Button color="purple" size="sm">
              <ArrowPathIcon title="refresh" className="h-full" />
            </Button>
            <Button color="light-green" size="sm" className="w-fit flex items-center gap-1" onClick={() => handlerModal(true)}>
              Новая запись
            </Button>
          </div>
        </Card>
        <Tables/>
      </main>
      <Modal/>
    </div>
  )
}

export default App