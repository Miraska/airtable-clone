export const REMAINING_PAYMENT_OPTIONS = [
  '#REF!'
] as const;

export type RemainingPayment = typeof REMAINING_PAYMENT_OPTIONS[number];