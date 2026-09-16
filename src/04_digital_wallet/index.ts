import type { Transaction } from "./interfaces.js";
import { PayTechBank, AcmeBank } from "./factories.js";

const data: Transaction = {
  reference: "e0f4763d-28ea-42d4-ac1c-c4013c242105",
  date: new Date("2025-02-25 06:33:00+03"),
  amount: 177.39,
  currency: "SAR",
  senderAccountNumber: "SA6980000204608016212908",
  bankCode: "FDCSSARI",
  receiverAccountNumber: "SA6980000204608016211111",
  beneficiaryName: "Jane Doe",
  notes: ["Lorem Epsum", "Dolor Sit Amet"],
  paymentType: 145,
  chargeDetails: "RB",
};

const transaction = new AcmeBank(data);
const send = transaction.sendMoney();
console.log(send);
console.log("#######");
const receive = transaction.receiveMoney();
console.log(receive);
