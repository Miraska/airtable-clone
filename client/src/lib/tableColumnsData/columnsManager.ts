const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Имя", type: "text", sortable: true },
  { key: "tel", label: "Номер телефона", type: "text", sortable: true },
  { key: "date", label: "День рождения", type: "date", sortable: true },
  { key: "orders", label: "Заявки", type: "related", sortable: true },
  { key: "reviews", label: "Проверяю", type: "review", sortable: true },
];

export default columns;