import {
  CreditScoreLoan,
  BankStatementLoan,
  AIRiskModelLoan,
} from "./concreteFactories.js";
import type { UnderwritingEngines } from "./UnderwritingEnginesInterface.js";
import { ApprovalStatus } from "./enums.js";
import LoanFactory from "./factory.js";
import Person from "./Person.js";

class Application {
  public factory: LoanFactory | undefined;
  public loan: UnderwritingEngines | undefined;
  public personProfile: Person;

  constructor(personProfile: Person) {
    this.personProfile = personProfile;
  }

  public generateLoan(type: string) {
    if (type === "credit") {
      this.factory = new CreditScoreLoan();
    } else if (type === "bank") {
      this.factory = new BankStatementLoan();
    } else if (type === "ai") {
      this.factory = new AIRiskModelLoan();
    } else {
      throw new Error("Type not correct");
    }
    this.loan = this.factory.createLoan();
    this.loan.process(this.personProfile);
  }

  public getLoanStatus(): ApprovalStatus | undefined {
    return this.loan?.approvalStatus;
  }
}

const pProfile: Person = new Person(1700, 1000, 700, 15);

let app = new Application(pProfile);
app.generateLoan("credit");

if (app.getLoanStatus() === ApprovalStatus.pending) {
  app.generateLoan("bank");
}

if (app.getLoanStatus() === ApprovalStatus.pending) {
  app.generateLoan("ai");
}

app.factory?.displayLoanData(app.loan);
