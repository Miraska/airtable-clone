export const SWIFT_STATUS_OPTIONS = [
  'заявка закрыта',
  'Возврат',
  'деньги у получателя',
  'SWIFT получен',
  'SWIFT 103 запрошен',
  'заявление отправлено'
] as const;

export type SwiftStatus = typeof SWIFT_STATUS_OPTIONS[number];