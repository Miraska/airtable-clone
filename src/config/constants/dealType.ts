export const DEAL_TYPE_OPTIONS = [
  'Импорт',
  'Экспорт'
] as const;

export type DealType = typeof DEAL_TYPE_OPTIONS[number];