const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Наименование', type: "text", sortable: true },
    { key: 'subagentPayers', label: 'Плательщики Субагента', type: "subagentPayers", sortable: true },
    { key: 'orders', label: 'Заявки', type: "orders", sortable: true },
  ];

export default columns;