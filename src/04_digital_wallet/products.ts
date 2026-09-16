import * as Models from "./interfaces.js";

export class TransferInfo implements Models.Transfer {
  public reference: string;
  public date: Date;
  public amount: number;
  public currency: string;

  constructor(transaction: Models.Transaction) {
    this.reference = transaction.reference;
    this.date = transaction.date;
    this.amount = transaction.amount;
    this.currency = transaction.currency;
  }

  createTransferInfoXML(): string {
    const data = `<TransferInfo>
    <Reference>${this.reference}</Reference>
    <Date>${this.date}</Date>
    <Amount>${this.amount}</Amount>
    <Currency>${this.currency}</Currency>
    </TransferInfo>`;
    return data;
  }
}

export class SenderInfo implements Models.Sender {
  public accountNumber: string;

  constructor(transaction: Models.Transaction) {
    this.accountNumber = transaction.senderAccountNumber;
  }

  public createSenderInfoXML() {
    const data = `<SenderInfo>
    <AccountNumber>${this.accountNumber}</AccountNumber>
    </SenderInfo>`;
    return data;
  }
}

export class ReceiverInfo implements Models.Receiver {
  public bankCode: string;
  public accountNumber: string;
  public beneficiaryName: string;

  constructor(transaction: Models.Transaction) {
    this.bankCode = transaction.bankCode;
    this.accountNumber = transaction.receiverAccountNumber;
    this.beneficiaryName = transaction.beneficiaryName;
  }

  public createReceiverInfoXML(): string {
    const data = `<ReceiverInfo>
    <BankCode>${this.bankCode}</BankCode>
    <AccountNumber>${this.accountNumber}</AccountNumber>
    <BeneficiaryName>${this.beneficiaryName}</BeneficiaryName>
    </ReceiverInfo>`;
    return data;
  }
}

export class Notes implements Models.Notes {
  public notes: string[];

  constructor(transaction: Models.Transaction) {
    this.notes = transaction.notes;
  }

  public createNotesXML(): string | undefined {
    if (!this.notes.length) {
      return undefined;
    }
    let tempArray: string[] = [];
    this.notes.forEach((note) => tempArray.push(`<Note>${note}</Note>`));
    return `<Notes>${tempArray.join("")}</Notes>`;
  }
}

export class PaymentType implements Models.PaymentType {
  public paymentType: number;

  constructor(transaction: Models.Transaction) {
    this.paymentType = transaction.paymentType;
  }

  public createPaymentXML(): string | undefined {
    if (this.paymentType == 99) return undefined;
    return `<PaymentType>${this.paymentType}</PaymentType>`;
  }
}

export class ChargeDetails implements Models.ChargeDetails {
  public chargeDetails: string;

  constructor(transaction: Models.Transaction) {
    this.chargeDetails = transaction.chargeDetails;
  }

  public ChargeDetailsXML(): string | undefined {
    if (this.chargeDetails === "SHA") return undefined;
    return `<ChargeDetails>${this.chargeDetails}</ChargeDetails>`;
  }
}
