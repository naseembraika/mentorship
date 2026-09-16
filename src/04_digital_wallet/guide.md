# Structure of XML

```
|- PaymentRequestMessage
|-----|-> TransferInfo
          - Reference
          - Date
          - Amount
          - Currency

      |-> SenderInfo
          - AccountNumber

      |-> ReceiverInfo
          - BankCode
          - AccountNumber
          - BeneficiaryName

      |-> Notes
          - Note

      |-> PaymentType

      |-> ChargeDetails


```

# Sending Money

I weill generate XML file to send money

Data sample e.g.

```
Transfer Info
{
  reference: string,
  date: Date,
  amount: number,
  currency: string,
}

Sender Info
{
  accountNumber: string,
}

Receiver Info
{
  bankCode: string,
  accountNumber: string,
  beneficiaryName: string
}

Notes => Array of strings

Payment Type => Number except 99

Charge Details => string except SHA
```
