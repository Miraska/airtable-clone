import { Card } from "@material-tailwind/react";
import { useTableStore } from "../../hooks/useTableStore/useTableStore";
import TABLE_CONFIG from "../../lib/config/TABLE_CONFIG";
import { useEffect, useState } from "react";

export default function Tables() {  
  const OPEN_TABLE_NAME = useTableStore((store) => store.currentTable)
  const TABLE_DATA = useTableStore((store) => store.dataTable)
  
  const MANAGER_DATA = [
    { id: "1", name: "Алина", tel: "+7 987 654 32 10", date: "01.01.1970", "Клиенты": [1, 2] },
    { id: "2", name: "Элина", tel: "+7 987 654 32 10", date: "01.01.1970", "Клиенты": [2, 3] },
    { id: "3", name: "Алена", tel: "+7 987 654 32 10", date: "01.01.1970", "Клиенты": [3] },
  ]
  const CLIENT_DATA = [
    { id: "1", name: "Алина", inn: "7654 3210" },
    { id: "2", name: "Элина", inn: "7654 3210" },
    { id: "3", name: "Алена", inn: "7654 3210" },
  ]
  const SUBAGENT_DATA = [
    { id: "1", name: "JJ", subagent_payer: ["Сбер", "Альфа банк"] },
    { id: "2", name: "JJK", subagent_payer: ["Сбер"] },
    { id: "3", name: "MHA", subagent_payer: [] },
  ]
  const SUBAGENT_PAYER_DATA = [
    { id: "1", name: "Сбер", subagent: [1, 2] },
    { id: "2", name: "Тиньков", subagent: [2, 3] },
    { id: "3", name: "Альфа банк", subagent: [3] },
  ]
  
  const [tableHead, setTableHead] = useState([])
  
  useEffect(() => {
    switch(OPEN_TABLE_NAME) {
      case "order":
        TABLE_CONFIG.order.cols.map((item) => {
          
        })
        setTableHead()
      break
      
      case "subagent":
      break
      
      case "subagent_payer":
      break
    }
  }, [OPEN_TABLE_NAME])
  
  return(
    <Card className="w-full h-full overflow-scroll border text-gray-900 dark:text-white dark:bg-gray-900 dark:border-gray-800">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          {
            
          }
        </thead>
      </table>
    </Card>
  )
}
