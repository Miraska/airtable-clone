import { Card } from "@material-tailwind/react"
import Sidebar from "./elements/sidebar/Sidebar"
import Modal from "./elements/modal/Modal"
import Subagent from "./elements/table/Subagent"
import { useTableStore } from "./hooks/useTableStore/useTableStore"
import SubagentPayer from "./elements/table/SubagentPayer"
// import OrderTable from "./elements/table/Order"

function App() {
  const CURRENT_TABLE = useTableStore((store) => store.currentTable)
  let renderComponent: JSX.Element | undefined;
  
  switch (CURRENT_TABLE) {
    // case "order":
    //   renderComponent = <OrderTable/>
    // break
    case "subagent_payer":
      renderComponent = <SubagentPayer/>
    break
    case "subagent":
      renderComponent = <Subagent/>
    break
  }
  
  return (
    <div className="flex w-full h-full">
      <Sidebar/>
      <main className="pt-2 pb-2 pr-2 flex flex-col w-full overflow-scroll">
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