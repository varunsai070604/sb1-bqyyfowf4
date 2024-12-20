import { RiskAnalysis } from '../types/risk';
import { calculateRiskScores } from './scoring';
import { getRiskDescription } from './descriptions';
import { getRecommendations } from './recommendations';

export const analyzeUrl = (url: string): RiskAnalysis => {
  const scores = calculateRiskScores(url);
  
  return {
    malware: createRiskDetail('malware', scores.malware),
    phishing: createRiskDetail('phishing', scores.phishing),
    spam: createRiskDetail('spam', scores.spam),
    unwantedSoftware: createRiskDetail('unwantedSoftware', scores.unwantedSoftware),
    privacyRisks: createRiskDetail('privacyRisks', scores.privacyRisks)
  };
};

const createRiskDetail = (type: string, score: number) => ({
  type,
  severity: score >= 70 ? 'high' : score >= 40 ? 'moderate' : 'low',
  percentage: score,
  description: getRiskDescription(type, score),
  recommendations: getRecommendations(type, score)
});