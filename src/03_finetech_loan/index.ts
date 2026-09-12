enum ApprovalStatus {
  approve = "APPROVE",
  pending = "PENDING",
  reject = "REJECT",
}

enum RiskScore {
  high = "HIGH",
  medium = "MEDIUM",
  low = "LOW",
}

interface UnderwritingEngines {
  approvalStatus: ApprovalStatus | undefined;
  riskScore: RiskScore | undefined;
  recommendedInterestRate: number | undefined;
  process(personProfile: Person): void;
}

class Person {
  public monthlyIncome: number;
  public monthlyExpenses: number;
  public creditScore: number;
  public PD: number;

  constructor(mIncome: number, mExpenses: number, creditScore: number, PD: number) {
    this.monthlyIncome = mIncome;
    this.monthlyExpenses = mExpenses;
    this.creditScore = creditScore;
    this.PD = PD;
  }
}

// Check credit score range (Score = S)
// Table:       Score -- Risk   -- Action   -- Interest Rate
// if        S >= 750 -- low    -- approve  -- 5% per 10k
// if 749 >= S >= 600 -- medium -- pending  -- check bank statement
// if         S < 600 -- high   -- rejected -- null
class CreditScore implements UnderwritingEngines {
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
class BankStatement implements UnderwritingEngines {
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
class AIRiskModel implements UnderwritingEngines {
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

abstract class LoanFactory {
  public abstract createLoan(): UnderwritingEngines;

  public displayLoanData(loan: UnderwritingEngines | undefined): void {
    console.log(`Status: ${loan?.approvalStatus}`);
    console.log(`Risk Score: ${loan?.riskScore}`);
    console.log(`Recommended Interest Rate: ${loan?.recommendedInterestRate}%`);
  }
}

class CreditScoreLoan extends LoanFactory {
  public createLoan(): CreditScore {
    return new CreditScore();
  }
}

class BankStatementLoan extends LoanFactory {
  public createLoan(): BankStatement {
    return new BankStatement();
  }
}

class AIRiskModelLoan extends LoanFactory {
  public createLoan(): AIRiskModel {
    return new AIRiskModel();
  }
}

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
