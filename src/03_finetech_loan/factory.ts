import type { UnderwritingEngines } from "./UnderwritingEnginesInterface.js";

export default abstract class LoanFactory {
  public abstract createLoan(): UnderwritingEngines;

  public displayLoanData(loan: UnderwritingEngines | undefined): void {
    console.log(`Status: ${loan?.approvalStatus}`);
    console.log(`Risk Score: ${loan?.riskScore}`);
    console.log(`Recommended Interest Rate: ${loan?.recommendedInterestRate}%`);
  }
}
