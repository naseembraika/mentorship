import { ApprovalStatus, RiskScore } from "./enums.js";
import Person from "./Person.js";

export interface UnderwritingEngines {
  approvalStatus: ApprovalStatus | undefined;
  riskScore: RiskScore | undefined;
  recommendedInterestRate: number | undefined;
  process(personProfile: Person): void;
}
