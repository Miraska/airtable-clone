const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Имя", type: "text", sortable: true },
  { key: "tel", label: "Номер телефона", type: "text", sortable: true },
  { key: "date", label: "День рождения", type: "date", sortable: true },
  { key: "orders", label: "Заявки", type: "orders", sortable: true },
  { key: "review", label: "Проверяю", type: "managers", sortable: true },
];

export default columns;