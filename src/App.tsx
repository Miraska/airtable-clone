import Sidebar from "./elements/sidebar/Sidebar"
import Table from "./elements/table/Table"

function App() {  
  return (
    <div id="layout" className="flex dark:bg-[#09090b]">
      <Sidebar/>
      <Table/>
    </div>
  )
}

export default App
