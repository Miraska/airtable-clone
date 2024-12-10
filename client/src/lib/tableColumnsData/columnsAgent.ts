const columns = [
  { key: "id", label: "ID", sortable: true, readonly: true },
  { key: "name", label: "Наименование", type: "text", sortable: true },
  { key: "orders", label: "Заявки", type: "related", sortable: true },
];

export default columns;