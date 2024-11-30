import Table from "./Table"

export default function SubagentPayerTable() {
  const SubagentPayerTable = {
    name: "Плательщик Субагента",
    cols: [
      { key: "id", label: "ID" },
      { key: "name", label: "Наименование" },
      { key: "subagent", label: "Субагенты" },
      { key: "orders", label: "Заявки" }
    ],
    data: [
      { id: 1, name: "ПДД", subagent: "ООО", order: "1, 2, 3" },
      { id: 2, name: "ННН", subagent: "ВЛЫДЖФЖВ", order: "1, 2, 3" }
    ]
  }
  
  return (
    <>
      <Table tableName={ SubagentPayerTable.name } columns={SubagentPayerTable.cols} data={SubagentPayerTable.data}/>
    </>
  )
}