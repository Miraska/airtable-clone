import { Card, Button } from "@material-tailwind/react"
import Sidebar from "./elements/sidebar/Sidebar"
import Table from "./elements/table/Table"
import { useState } from "react"
import Modal from "./elements/modal/Modal"

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  
  function handlerVisibility(state: boolean) {
    setIsVisible(state)
  }
  
  function handlerModal(state?: boolean) {
    if (state == undefined) {
      return
    } else {
      setOpenModal(state)
    }
  }
  
  return (
    <div className="flex w-full h-full">
      <Sidebar handler={ handlerVisibility } />
      <main className="pt-2 pb-2 pr-2 flex flex-col w-full overflow-scroll">
        <Card className="w-ful border mb-2 p-4 overflow-y-scroll dark:text-white dark:bg-gray-900 dark:border-gray-800">
          <div className="flex flex-row gap-4 min-w-max">
            <Button color="blue" size="sm" className="w-fit flex items-center gap-1" onClick={() => { handlerModal(true) }}>
              Новая запись
            </Button>
          </div>
        </Card>
        <Table isVis={isVisible} />
      </main>
      <Modal open={ openModal } handlerOpen={handlerModal} />
    </div>
  )
}

export default App