export const BANK_OPTIONS = [
  'Сбербанк',
  'МТИ',
  'Альфа банк',
  'Т-Банк',
  'Росбанк',
  'Морской'
] as const;

export type Bank = typeof BANK_OPTIONS[number];