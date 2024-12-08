const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Имя", type: "text", sortable: true },
  { key: "tel", label: "Номер телефона", type: "text", sortable: true },
  { key: "date", label: "День рождения", type: "date", sortable: true },
  { key: "orders", label: "Заявки", type: "related", sortable: true },
  { key: "review", label: "Проверяю", type: "related", sortable: true },
];

export default columns;