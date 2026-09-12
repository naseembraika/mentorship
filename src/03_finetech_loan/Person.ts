export default class Person {
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
