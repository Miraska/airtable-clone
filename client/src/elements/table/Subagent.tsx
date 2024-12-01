import Table from "./Table"

export default function Subagent() {
  const SubagentTable = {
    name: "Субагенты",
    cols: { id: "ID", name: "Наименование", subagent_payer: "Плательщики Субагента", order: "Заявки" },
    data: [
      { id: 1, name: "ТДК", subagent_payer: "ООО", order: "1, 2, 3" },
      { id: 2, name: "ПДН", subagent_payer: "ВЛЫДЖФЖВ", order: "1, 2, 3" }
    ]
  }
  
  return (
    <>
      <Table tableName={ SubagentTable.name } columns={SubagentTable.cols} data={SubagentTable.data}/>
    </>
  )
}