import { Card } from "@material-tailwind/react";
import { useState } from "react";
// import { useTableStore } from "../../hooks/useTableStore/useTableStore";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"

// type Manager = {
//   id: number
//   name: string
//   tel: string
//   date: string
// }

// const MANAGER_TABLE_DATE = [
//   { 
//     "id": 1,
//     "name": "Алина",
//     "tel": "+7 987 654 32 10",
//     "date": "01.01.1970"
//   },
//   { 
//     "id": 2,
//     "name": "Егор",
//     "tel": "+7 987 654 32 10",
//     "date": "01.01.1970"
//   },
//   { 
//     "id": 3,
//     "name": "Саня",
//     "tel": "+7 987 654 32 10",
//     "date": "01.01.1970"
//   }
// ]

export default function Tables() {  
  // const OPEN_TABLE_NAME = useTableStore((store) => store.currentTable)
  // const SET_CURRENT_TABLE = useTableStore((store) => store.setCurrentTable)
  
  const [rowData, setRowData] = useState([
     { ID: "1", "Имя": "Алина", "Телефон": "+7 987 654 32 10", "День рождения": "01.01.1970" },
     { ID: "2", "Имя": "Элина", "Телефон": "+7 987 654 32 10", "День рождения": "01.01.1970" },
     { ID: "3", "Имя": "Алена", "Телефон": "+7 987 654 32 10", "День рождения": "01.01.1970" },
   ]);
  
  const [colDefs, setColDefs] = useState([
     { field: "ID", filter: true },
     { field: "Имя", filter: true },
     { field: "Телефон", filter: true },
     { field: "День рождения", filter: true }
   ]);
  
  return(
    <Card className="w-full h-full overflow-scroll border text-gray-900 dark:text-white dark:bg-gray-900 dark:border-gray-800">
      <div className="h-full ag-theme-quartz-dark">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
        />
       </div>
    </Card>
  )
}
