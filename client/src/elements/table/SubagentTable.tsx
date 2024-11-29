import Table from "./Table"

export default function SubagentTable() {
  const SubagentTable = {
    name: "Субагенты",
    cols: [
      { key: "id", label: "ID" },
      { key: "name", label: "Наименование" },
      { key: "subagent_payer", label: "Плательщик Субагента" },
      { key: "orders", label: "Заявки" }
    ],
    data: [
      { id: 1, name: "ТДК", subagent_payer: "ПДХ", order: "1, 2, 3" },
      { id: 2, name: "ТДК", subagent_payer: "ПДХ", order: "1, 2, 3" }
    ]
  }
  
  return (
    <>
      <Table tableName={ SubagentTable.name } columns={SubagentTable.cols} data={SubagentTable.data}/>
    </>
  )
}