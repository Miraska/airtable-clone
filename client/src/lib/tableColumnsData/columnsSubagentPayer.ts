const columns = [
  { key: "id", label: "ID", sortable: true},
  { key: "name", label: "Наименование", type: "text", sortable: true },
  { key: "subagents", label: "Субагенты", type: "subagents", sortable: true },
  { key: "orders", label: "Заявки", type: "orders", sortable: true },
];

export default columns;