import Modal from "../modal/Modal"
import Table from "./Table"

export default function Subagent() {
  const SubagentTable = {
    name: "Плательщик Субагента",
    cols: [
      { key: "id", label: "ID" },
      { key: "name", label: "Наименование" },
      { key: "subagent", label: "Субагенты" },
      { key: "order", label: "Заявки" }
    ],
    data: [
      { "id": 1, "name": "ПДД", "subagent": "ООО", "order": "1, 2, 3" },
      { "id": 2, "name": "ННН", "subagent": "ВЛЫДЖФЖВ", "order": "1, 2, 3" }
    ]
  }
  
  return (
    <>
      <Table tableName={ SubagentTable.name } columns={SubagentTable.cols} data={SubagentTable.data}/>
      <Modal />
    </>
  )
}