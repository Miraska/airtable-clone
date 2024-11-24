export interface ApplicationFormData {
  id?: string; // Added id field for editing
  // Basic Information
  status: string;
  nomerZayavki: string;
  manager: string[];
  checker: string[];
  placementDate: string;
  workStartDate: string;
  contractor: string[];
  agent: string[];
  client: string[];
  clientInn: string;
  exporterImporterName: string;
  swiftCode: string;
  country: string[];

  // Payment Details
  paymentTerms: string;
  orderNumber: string;
  orderSignedDate: string;
  currency: string;
  amountInCurrency: number;
  vipClientTerms: string;
  bankCommissionPercent: number;
  letterOfCreditCommission: number;
  escrowCommission: number;
  exchangeRate: number;
  exchangeRateFixDate: string;
  applicationAmountRubles: number;
  hasLetterOfCredit: boolean;

  // Process Status
  dealType: string;
  hasReceivedPrimaryDocs: boolean;
  invoiceIssuedDate: string;
  agentContractSignedDate: string;
  bankRegistrationDate: string;
  letterOfCreditOpenDate: string;
  currencyPaidDate: string;
  currencyReceivedDate: string;
  rublesClientPaidDate: string;
  letterOfCreditDisclosedDate: string;
  reportActSignedDate: string;
  dealClosedDate: string;
  dealCycleDays: number;

  // Additional Information
  paymentPurpose: string;
  subagent: string[];
  subagentPayer2: string[];
  subagentPayerOrderNumber: number;
  agentSubagentDocsDate: string;
  swiftReceivedDate: string;
  swift103RequestedDate: string;
  swift199RequestedDate: string;
  swiftStatus: string;
  moneyStuck: boolean;
  moneyStuckComments: string;

  // Documents
  applicationFile: File | null;
  invoiceFile: File | null;
  orderFile: File | null;
  swiftFile: File | null;
  swift103File: File | null;
  swift199File: File | null;
  reportActFile: File | null;

  // Financial Details
  receivedAmount: number;
  agentFee: string;
  remainingPayment: string;
  bank: string;
  comments: string;
  errors: string;
  receivedAmountDate: string;
  agentFeeDate: string;
  subagentPayer: string;
  inProgress: number;
}

export interface ApplicationFormProps {
  initialData?: Partial<ApplicationFormData>;
  onSubmit: (data: ApplicationFormData) => void;
  onCancel: () => void;
}