export const CURRENCY_OPTIONS = [
  'Юань',
  'Доллар',
  'Евро',
  'Дирхам'
] as const;

export type Currency = typeof CURRENCY_OPTIONS[number];