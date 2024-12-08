const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Краткое название", type: "text", sortable: true },
  { key: "code", label: "Код", type: "text", sortable: true },
  { key: "full_name", label: "Полное наименование", type: "text", sortable: true },
  { key: "orders", label: "Заявки", type: "related", sortable: true },
];

export default columns;