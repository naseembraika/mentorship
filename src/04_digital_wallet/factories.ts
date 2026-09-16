import * as products from "./products.js";
import type { Transaction } from "./interfaces.js";

abstract class TransactionFactory {
  public transaction: Transaction;

  constructor(transaction: Transaction) {
    this.transaction = transaction;
  }

  abstract receiveMoney(): string;

  public createTransferInfo(): products.TransferInfo {
    return new products.TransferInfo(this.transaction);
  }

  public createSenderInfo(): products.SenderInfo {
    return new products.SenderInfo(this.transaction);
  }

  public createReceiverInfo(): products.ReceiverInfo {
    return new products.ReceiverInfo(this.transaction);
  }

  public createNotes(): products.Notes {
    return new products.Notes(this.transaction);
  }

  public createPaymentType(): products.PaymentType {
    return new products.PaymentType(this.transaction);
  }

  public createChargeDetails(): products.ChargeDetails {
    return new products.ChargeDetails(this.transaction);
  }

  public formateDate(): string {
    const date = new Date(this.transaction.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  }

  public sendMoney(): string {
    const result = `<?xml version="1.0" encoding="utf-8"?>
    <PaymentRequestMessage>
    ${this.createTransferInfo().createTransferInfoXML()}
    ${this.createSenderInfo().createSenderInfoXML()}
    ${this.createReceiverInfo().createReceiverInfoXML()}
    ${this.createNotes().createNotesXML()}
    ${this.createPaymentType().createPaymentXML()}
    ${this.createChargeDetails().ChargeDetailsXML()}
    </PaymentRequestMessage>`.replaceAll("undefined", "");
    return result;
  }
}

export class PayTechBank extends TransactionFactory {
  public receiveMoney(): string {
    const amount = this.transaction.amount;
    const reference = this.transaction.reference;
    const notes = this.transaction.notes;

    return `${this.formateDate()}${amount}#${reference}#note/${notes.join("/")}`;
  }
}

export class AcmeBank extends TransactionFactory {
  public receiveMoney(): string {
    const amount = this.transaction.amount;
    const reference = this.transaction.reference;
    return `${amount}//${reference}//${this.formateDate()}`;
  }
}
