export const PAYMENT_TERMS_OPTIONS = [
  'Аккредитив',
  'Предоплата',
  'Постоплата',
  'Эскроу'
] as const;

export type PaymentTerms = typeof PAYMENT_TERMS_OPTIONS[number];