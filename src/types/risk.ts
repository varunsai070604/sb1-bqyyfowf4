export interface RiskDetail {
  type: string;
  severity: 'low' | 'moderate' | 'high';
  description: string;
  percentage: number;
  recommendations: string[];
}

export interface RiskAnalysis {
  malware: RiskDetail;
  phishing: RiskDetail;
  spam: RiskDetail;
  unwantedSoftware: RiskDetail;
  privacyRisks: RiskDetail;
}