import LoanFactory from "./factory.js";
import { CreditScore, BankStatement, AIRiskModel } from "./products.js";

export class CreditScoreLoan extends LoanFactory {
  public createLoan(): CreditScore {
    return new CreditScore();
  }
}

export class BankStatementLoan extends LoanFactory {
  public createLoan(): BankStatement {
    return new BankStatement();
  }
}

export class AIRiskModelLoan extends LoanFactory {
  public createLoan(): AIRiskModel {
    return new AIRiskModel();
  }
}
