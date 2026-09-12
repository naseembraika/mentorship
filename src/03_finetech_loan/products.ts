import { type UnderwritingEngines } from "./UnderwritingEnginesInterface.js";
import { ApprovalStatus, RiskScore } from "./enums.js";
import Person from "./Person.js";

// Check credit score range (Score = S)
// Table:       Score -- Risk   -- Action   -- Interest Rate
// if        S >= 750 -- low    -- approve  -- 5% per 10k
// if 749 >= S >= 600 -- medium -- pending  -- check bank statement
// if         S < 600 -- high   -- rejected -- null
export class CreditScore implements UnderwritingEngines {
  public approvalStatus: ApprovalStatus | undefined;
  public riskScore: RiskScore | undefined;
  public recommendedInterestRate: number = 0;

  public process(personProfile: Person): void {
    if (personProfile.creditScore >= 750) {
      this.approvalStatus = ApprovalStatus.approve;
      this.riskScore = RiskScore.low;
      this.recommendedInterestRate = 5;
    } else if (personProfile.creditScore >= 600) {
      this.approvalStatus = ApprovalStatus.pending;
      this.riskScore = RiskScore.medium;
    } else {
      this.approvalStatus = ApprovalStatus.reject;
      this.riskScore = RiskScore.high;
    }
  }
}

// Check the free cash flow: Income - Expenses (CF)
// Monthly Loan Payment is 200 (LP)
// Minimum acceptable CF remaining is 400 (minCF)
// Maximum acceptable CF remaining is 1000 (maxCF)
// Remaining CF after subtract LP is (RCF)
// Table:        CashFlow -- Risk   -- Action   -- Interest Rate
// if         RCF > maxCF -- low    -- approve  -- get from previous engine
// if maxCF > RCF > minCF -- medium -- pending  -- wait for AIRiskModel
// if         RCF < minCF -- high   -- rejected -- null
export class BankStatement implements UnderwritingEngines {
  public approvalStatus: ApprovalStatus | undefined;
  public riskScore: RiskScore | undefined;
  public recommendedInterestRate: number = 0;
  private loanPayment = 200;
  private minRemainingCashFlow = 400;
  private maxRemainingCashFlow = 1000;

  public process(personProfile: Person): void {
    const cashFlow = personProfile.monthlyIncome - personProfile.monthlyExpenses;
    const remainingCashFlow = cashFlow - this.loanPayment;
    if (remainingCashFlow >= this.maxRemainingCashFlow) {
      this.approvalStatus = ApprovalStatus.approve;
      this.riskScore = RiskScore.low;
      this.recommendedInterestRate = 5;
    } else if (remainingCashFlow >= this.minRemainingCashFlow) {
      this.approvalStatus = ApprovalStatus.pending;
      this.riskScore = RiskScore.medium;
    } else {
      this.approvalStatus = ApprovalStatus.reject;
      this.riskScore = RiskScore.high;
    }
  }
}

// it's depend on Probability of Default (PD)
// Table:    PD  -- Risk         -- Action   -- Interest Rate
// if  PD < 15%  -- acceptable   -- approve  -- get from previous engine
// if  PD >= 15% -- unacceptable -- rejected -- null
export class AIRiskModel implements UnderwritingEngines {
  public approvalStatus: ApprovalStatus | undefined;
  public riskScore: RiskScore | undefined;
  public recommendedInterestRate: number = 0;

  public process(personProfile: Person): void {
    if (personProfile.PD < 15) {
      this.approvalStatus = ApprovalStatus.approve;
      this.riskScore = RiskScore.low;
      this.recommendedInterestRate = 15;
    } else {
      this.approvalStatus = ApprovalStatus.reject;
      this.riskScore = RiskScore.high;
    }
  }
}
