import { Card, Button } from "@material-tailwind/react"
import Sidebar from "./elements/sidebar/Sidebar"
import Modal from "./elements/modal/Modal"
import { ArrowPathIcon } from "@heroicons/react/24/solid"
import useModalStore from "./hooks/useModalStore/useModalStore"
import SubagentTable from "./elements/table/SubagentTable"
import { useTableStore } from "./hooks/useTableStore/useTableStore"
import SubagentPayerTable from "./elements/table/SubagentPayerTable"
import OrderTable from "./elements/table/Order"

function App() {
  const handlerModal = useModalStore((store) => store.handlerModal)
  const CURRENT_TABLE = useTableStore((store) => store.currentTable)
  let renderComponent: JSX.Element | undefined;
  
  switch (CURRENT_TABLE) {
    case "order":
      renderComponent = <OrderTable/>
    break
    case "subagent_payer":
      renderComponent = <SubagentPayerTable/>
    break
    case "subagent":
      renderComponent = <SubagentTable/>
    break
  }
  
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
        <Card className="w-full h-full overflow-scroll border text-gray-900 dark:text-white dark:bg-gray-900 dark:border-gray-800">
          {
            renderComponent
          }
        </Card>
      </main>
      <Modal/>
    </div>
  )
}

export default App