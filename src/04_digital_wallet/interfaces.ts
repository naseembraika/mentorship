export interface Transfer {
  reference: string;
  date: Date;
  amount: number;
  currency: string;

  createTransferInfoXML(): string;
}

export interface Sender {
  accountNumber: string;
  createSenderInfoXML(): string;
}

export interface Receiver {
  bankCode: string;
  accountNumber: string;
  beneficiaryName: string;

  createReceiverInfoXML(): string;
}

export interface Notes {
  notes: string[];
  createNotesXML(): string | undefined;
}

export interface PaymentType {
  paymentType: number;
  createPaymentXML(): string | undefined;
}

export interface ChargeDetails {
  chargeDetails: string;
  ChargeDetailsXML(): string | undefined;
}

export interface Transaction {
  reference: string;
  date: Date;
  amount: number;
  currency: string;
  senderAccountNumber: string;
  bankCode: string;
  receiverAccountNumber: string;
  beneficiaryName: string;
  notes: string[];
  paymentType: number;
  chargeDetails: string;
}
